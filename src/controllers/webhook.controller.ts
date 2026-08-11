import { Request, Response, NextFunction } from "express";
import crypto from "crypto";
import { prisma } from "../config/db";

export const handleMidtransWebhook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { 
      order_id, 
      status_code, 
      gross_amount, 
      signature_key, 
      transaction_status, 
      transaction_id 
    } = req.body;
    
    // 1. Verifikasi Signature Key Midtrans agar tidak bisa diretas
    const serverKey = process.env.MIDTRANS_SERVER_KEY || "";
    const hash = crypto.createHash("sha512").update(order_id + status_code + gross_amount + serverKey).digest("hex");
    
    if (hash !== signature_key) {
      return res.status(403).json({ success: false, message: "Invalid Signature Key" });
    }

    // 2. Cari riwayat pembayaran di database
    const riwayat = await prisma.riwayatPembayaran.findFirst({
      where: { midtransOrderId: order_id },
      include: { langgananSekolah: true }
    });

    if (!riwayat) {
      return res.status(404).json({ success: false, message: "Order ID not found" });
    }

    // 3. Update database secara atomik
    await prisma.$transaction(async (tx) => {
      // Jika pembayaran Sukses
      if (transaction_status === "capture" || transaction_status === "settlement") {
        await tx.riwayatPembayaran.update({
          where: { id: riwayat.id },
          data: { status: "success", midtransTransactionId: transaction_id, webhookRawPayload: req.body }
        });

        const startDate = new Date();
        const endDate = new Date();
        if (riwayat.langgananSekolah.siklusPenagihan === "annual") {
          endDate.setFullYear(endDate.getFullYear() + 1);
        } else {
          endDate.setMonth(endDate.getMonth() + 1);
        }

        await tx.langgananSekolah.update({
          where: { id: riwayat.langgananSekolah.id },
          data: {
            statusPembayaran: "success",
            statusLangganan: "active",
            tanggalMulai: startDate,
            tanggalBerakhir: endDate
          }
        });

        await tx.sekolah.update({
          where: { id: riwayat.sekolahId },
          data: { status: "aktif" }
        });
      } 
      // Jika pembayaran Gagal/Kedaluwarsa/Batal
      else if (transaction_status === "cancel" || transaction_status === "deny" || transaction_status === "expire") {
        await tx.riwayatPembayaran.update({
          where: { id: riwayat.id },
          data: { status: "failed", midtransTransactionId: transaction_id, webhookRawPayload: req.body }
        });

        await tx.langgananSekolah.update({
          where: { id: riwayat.langgananSekolah.id },
          data: { statusPembayaran: "expired" }
        });
      }
    });

    // 4. Balas dengan HTTP 200 OK agar Midtrans tahu webhook sudah diterima
    return res.status(200).json({ received: true });
  } catch (error) {
    console.error("Midtrans Webhook Error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};
