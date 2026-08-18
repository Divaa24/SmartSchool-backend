import { Request, Response, NextFunction } from "express";
import { prisma } from "../config/db";
import { AppError } from "../utils/appError";
import { siswaSchema } from "../validations/siswa.validation";
import bcrypt from "bcrypt";

export const createSiswa = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sekolahId = (req as any).user?.sekolahId;
    if (!sekolahId) throw new AppError("Akses ditolak. Sekolah ID tidak ditemukan.", 403);

    const validatedData = siswaSchema.parse(req.body);
    const { namaLengkap, email, nisn, nis, kelasId } = validatedData;

    // Pastikan email belum terdaftar
    const existingEmail = await prisma.pengguna.findUnique({ where: { email } });
    if (existingEmail) throw new AppError("Email sudah terdaftar", 400);

    // Pastikan NISN belum terdaftar
    const existingNisn = await prisma.pengguna.findFirst({
      where: { nisn, sekolahId }
    });
    if (existingNisn) throw new AppError("NISN sudah terdaftar", 400);

    // Cari peran "siswa"
    const peranSiswa = await prisma.peran.findUnique({ where: { nama: "siswa" } });
    if (!peranSiswa) throw new AppError("Role siswa tidak ditemukan dalam sistem", 500);

    // Hash NISN sebagai default password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(nisn, salt);

    // Gunakan transaksi
    const siswa = await prisma.$transaction(async (tx) => {
      // 1. Buat pengguna
      const newSiswa = await tx.pengguna.create({
        data: {
          namaLengkap,
          email,
          namaPengguna: nisn, // bisa menggunakan NISN sebagai username juga
          kataSandi: hashedPassword,
          nisn,
          nis,
          sekolahId,
          peranId: peranSiswa.id,
        },
      });

      // 2. Jika ada kelasId, masukkan ke AnggotaKelas
      if (kelasId) {
        // Validasi apakah kelas tersebut ada dan milik sekolah ini
        const kelasExists = await tx.kelas.findFirst({
          where: { id: kelasId, sekolahId }
        });
        if (!kelasExists) {
          throw new AppError("Kelas tidak ditemukan atau bukan milik sekolah ini", 404);
        }

        await tx.anggotaKelas.create({
          data: {
            kelasId,
            siswaId: newSiswa.id,
          },
        });
      }

      return newSiswa;
    });

    res.status(201).json({
      success: true,
      message: "Data Siswa berhasil dibuat",
      data: {
        id: siswa.id,
        namaLengkap: siswa.namaLengkap,
        email: siswa.email,
        nisn: siswa.nisn,
      }
    });
  } catch (error) {
    next(error);
  }
};
