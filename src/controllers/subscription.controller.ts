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

    if (!paket) {
      throw new AppError(
        "Paket langganan tidak ditemukan",
        404,
      );
    }

    // Hitung total harga (jika annual, asumsikan dikali 12)
    const totalHarga =
      data.siklusPenagihan === "annual"
        ? Number(paket.harga) * 12
        : Number(paket.harga);

    // 3. Persiapkan API Call ke Midtrans
    // Ambil nama lengkap dari database karena di Token hanya ada userId
    const pengguna = await prisma.pengguna.findUnique({
      where: { id: req.user.userId },
      select: { namaLengkap: true },
    });

    const namaCustomer =
      pengguna?.namaLengkap || "Admin Sekolah";

    if (!process.env.MIDTRANS_SERVER_KEY) {
      throw new AppError(
        "MIDTRANS_SERVER_KEY belum dikonfigurasi",
        500,
      );
    }

    const orderId = `INV-${req.user.sekolahId}-${Date.now()}`;

    const midtransAuth = Buffer.from(
      process.env.MIDTRANS_SERVER_KEY + ":",
    ).toString("base64");

    const midtransResponse = await fetch(
      "https://app.sandbox.midtrans.com/snap/v1/transactions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${midtransAuth}`,
        },
        body: JSON.stringify({
          transaction_details: {
            order_id: orderId,
            gross_amount: totalHarga,
          },

          customer_details: {
            first_name: namaCustomer,
            email: req.user.email,
          },
        }),
      },
    );

    const transaction = await midtransResponse.json();

    if (!midtransResponse.ok) {
      throw new AppError(
        transaction?.error_messages?.join(", ") ||
          transaction?.status_message ||
          "Gagal membuat transaksi pembayaran",
        midtransResponse.status,
      );
    }

    // 4. Simpan ke Database (Atomic Transaction)
    await prisma.$transaction(async (tx) => {
      const langganan =
        await tx.langgananSekolah.create({
          data: {
            sekolahId: req.user!.sekolahId!,
            paketId: paket.id,
            dibuatOleh: req.user!.userId,

            statusPembayaran: "pending",

            statusLangganan: "trialing",

            hargaSaatBerlangganan: totalHarga,

            siklusPenagihan:
              data.siklusPenagihan,
            xenditInvoiceId: orderId,

            xenditPaymentLink:
              transaction.redirect_url,
          },
        });

      await tx.riwayatPembayaran.create({
        data: {
          langgananSekolahId: langganan.id,
          sekolahId: req.user!.sekolahId!,
          dibuatOleh: req.user!.userId,

          jumlah: totalHarga,

          status: "pending",

          xenditInvoiceId: orderId,
        },
      });
    });

    // 5. Kembalikan URL pembayaran ke Frontend
    return successResponse(
      res,
      "Invoice pembayaran berhasil dibuat",
      {
        invoice_url: transaction.redirect_url,
      },
      201,
    );
  } catch (error) {
    next(error);
  }
};


export const getPendingPayments = async (
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

    const pembayaranPending =
      await prisma.riwayatPembayaran.findMany({
        where: {
          sekolahId: req.user.sekolahId,
          status: "pending",
        },

        include: {
          langgananSekolah: {
            include: {
              paket: true,
            },
          },
        },

        orderBy: {
          dibuatPada: "desc",
        },
      });

    return successResponse(
      res,
      "Berhasil mendapatkan riwayat pembayaran",
      pembayaranPending,
      200,
    );
  } catch (error) {
    next(error);
  }
};