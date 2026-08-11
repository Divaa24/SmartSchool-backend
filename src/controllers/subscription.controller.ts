import { Response, NextFunction } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { prisma } from "../config/db";
import { createPaymentSchema } from "../validations/subscription.validation";
import { successResponse } from "../utils/responseFormatter";
import { AppError } from "../utils/appError";

export const createPayment = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user || !req.user.sekolahId) {
      throw new AppError(
        "Akses Ditolak: Anda tidak terhubung dengan sekolah manapun",
        403,
      );
    }

    // 1. Validasi Input
    const data = createPaymentSchema.parse(req.body);

    // 2. Cek ketersediaan paket
    const paket = await prisma.paket.findUnique({
      where: { id: data.paketId },
    });

    if (!paket) throw new AppError("Paket langganan tidak ditemukan", 404);

    // Hitung total harga (jika annual, asumsikan dikali 12)
    const totalHarga =
      data.siklusPenagihan === "annual"
        ? Number(paket.harga) * 12
        : Number(paket.harga);

    // 3. Persiapkan API Call ke Xendit
    // Ambil nama lengkap dari database karena di Token hanya ada userId
    const pengguna = await prisma.pengguna.findUnique({
      where: { id: req.user.userId },
      select: { namaLengkap: true },
    });
    const namaCustomer = pengguna?.namaLengkap || "Admin Sekolah";

    const xenditAuth = Buffer.from(
      process.env.XENDIT_SECRET_KEY + ":",
    ).toString("base64");
    const externalId = `INV-${req.user.sekolahId}-${Date.now()}`; // Kode unik invoice

    const xenditResponse = await fetch("https://api.xendit.co/v2/invoices", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${xenditAuth}`,
      },
      body: JSON.stringify({
        external_id: externalId,
        amount: totalHarga,
        payer_email: req.user.email,
        description: `Pembayaran Paket ${paket.nama} (${data.siklusPenagihan}) - SmartSchool`,
        customer: {
          given_names: namaCustomer, // Menggunakan nama dari database
          email: req.user.email,
        },
      }),
    });
    const invoice = await xenditResponse.json();

    if (!xenditResponse.ok) {
      throw new AppError(
        invoice?.message || "Gagal membuat invoice pembayaran",
        xenditResponse.status,
      );
    }

    // 4. Simpan ke Database (Atomic Transaction)
    await prisma.$transaction(async (tx) => {
      const langganan = await tx.langgananSekolah.create({
        data: {
          sekolahId: req.user!.sekolahId!,
          paketId: paket.id,
          dibuatOleh: req.user!.userId,
          statusPembayaran: "pending",
          statusLangganan: "trialing", // Status menunggu bayar
          hargaSaatBerlangganan: totalHarga,
          siklusPenagihan: data.siklusPenagihan,
          xenditInvoiceId: invoice.id,
          xenditPaymentLink: invoice.invoice_url,
        },
      });

      await tx.riwayatPembayaran.create({
        data: {
          langgananSekolahId: langganan.id,
          sekolahId: req.user!.sekolahId!,
          dibuatOleh: req.user!.userId,
          jumlah: totalHarga,
          status: "pending",
          xenditInvoiceId: invoice.id,
        },
      });
    });

    // 5. Kembalikan URL pembayaran ke Frontend
    return successResponse(
      res,
      "Invoice pembayaran berhasil dibuat",
      {
        invoice_url: invoice.invoice_url,
      },
      201,
    );
  } catch (error) {
    next(error);
  }
};
