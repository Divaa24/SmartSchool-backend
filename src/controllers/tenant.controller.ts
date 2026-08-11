import { Request, Response, NextFunction } from "express";
import { prisma } from "../config/db";
import { AppError } from "../utils/appError";
import { successResponse } from "../utils/responseFormatter";
import { tenantOnboardingSchema } from "../validations/tenant.validation";
import bcrypt from "bcryptjs";
import { generateOtp } from "../utils/generateOtp";
import { sendOtpEmail } from "../utils/email";
import crypto from "crypto";

export const registerTenant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validatedData = tenantOnboardingSchema.parse(req.body);

    // Cek apakah email sudah terdaftar
    const existingEmail = await prisma.pengguna.findUnique({
      where: { email: validatedData.email },
    });
    if (existingEmail) {
      throw new AppError("Email sudah terdaftar", 400);
    }

    // Cek apakah subdomain sudah dipakai
    const existingSubdomain = await prisma.sekolah.findUnique({
      where: { subdomain: validatedData.subdomain },
    });
    if (existingSubdomain) {
      throw new AppError("Subdomain sudah digunakan", 400);
    }

    // Pastikan paketId ada
    const paket = await prisma.paket.findUnique({
      where: { id: validatedData.paketId },
    });
    if (!paket) {
      throw new AppError("Paket langganan tidak ditemukan", 400);
    }

    // Ambil peranId untuk role "admin_sekolah"
    const peran = await prisma.peran.findUnique({
      where: { nama: "admin_sekolah" },
    });
    if (!peran) {
      throw new AppError("Peran admin_sekolah tidak ditemukan", 500);
    }

    // Hash kata sandi
    const hashedPassword = await bcrypt.hash(validatedData.kataSandi, 10);

    // Generate kode unik sekolah
    const randomChars = crypto.randomBytes(3).toString("hex").toUpperCase();
    const kodeSekolah = `SCH-${randomChars}`;

    // Generate OTP
    const otp = generateOtp();

    // Generate username dari email
    let baseUsername = validatedData.email.split("@")[0] || validatedData.email;
    
    // Gunakan prisma.$transaction
    await prisma.$transaction(async (tx) => {
      // Pastikan namaPengguna unik dalam transaksi
      let finalUsername = baseUsername;
      let userWithUsername = await tx.pengguna.findUnique({
        where: { namaPengguna: finalUsername },
      });
      if (userWithUsername) {
        finalUsername = `${baseUsername}${crypto.randomInt(100, 999)}`;
      }

      // Buat Sekolah baru
      const sekolah = await tx.sekolah.create({
        data: {
          nama: validatedData.namaSekolah,
          subdomain: validatedData.subdomain,
          kode: kodeSekolah,
          alamat: validatedData.alamatSekolah,
          telepon: validatedData.teleponSekolah,
          logo: validatedData.logo ?? null,
          konfigurasi: {
            jenjang: validatedData.jenjang,
          },
        },
      });

      // Buat LanggananSekolah
      await tx.langgananSekolah.create({
        data: {
          sekolahId: sekolah.id,
          paketId: validatedData.paketId,
          statusLangganan: "menunggu_pembayaran", // status default
        },
      });

      // Buat Pengguna baru sebagai Admin
      await tx.pengguna.create({
        data: {
          email: validatedData.email,
          namaPengguna: finalUsername,
          kataSandi: hashedPassword,
          namaLengkap: validatedData.nama,
          status: "menunggu_verifikasi",
          kodeOtp: otp,
          sekolahId: sekolah.id,
          peranId: peran.id,
          otpTimeout: new Date(Date.now() + 5 * 60 * 1000), // OTP berlaku 5 menit
        },
      });
    });

    // Panggil sendOtpEmail (setelah transaksi berhasil)
    await sendOtpEmail({
      email: validatedData.email,
      namaLengkap: validatedData.nama,
      kodeOtp: otp,
    });

    return successResponse(
      res,
      "Pendaftaran sekolah berhasil. Silakan cek email admin untuk verifikasi OTP.",
      null,
      201
    );
  } catch (error) {
    next(error);
  }
};
