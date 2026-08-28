import { Response } from "express";
import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import { prisma } from "../config/db";
import { createAbsensiSchema } from "../validations/absensi.validation";
import { AppError } from "../utils/appError";
import { AuthRequest } from "../middlewares/auth.middleware";
import { hitungJarakMeter } from "../utils/geo";
import { successResponse } from "../utils/responseFormatter";

export const createAbsensi = async (req: AuthRequest, res: Response) => {
  const userId = req.user!.userId;
  const sekolahId = req.user!.sekolahId;
  const file = req.file; // Foto jepretan webcam (jika metode 'face')

  const data = createAbsensiSchema.parse(req.body);

  try {
    // 1. Ambil data sekolah untuk verifikasi konfigurasi absensi
    const sekolah = await prisma.sekolah.findUnique({
      where: { id: sekolahId! },
    });

    if (!sekolah) throw new AppError("Data sekolah tidak ditemukan", 404);

    // Cek apakah metode yang dikirim Frontend diizinkan oleh sekolah
    if (
      sekolah.metodeAbsensiAktif.length > 0 &&
      !sekolah.metodeAbsensiAktif.includes(data.metode)
    ) {
      throw new AppError(
        `Metode absensi ${data.metode} sedang dinonaktifkan oleh sekolah`,
        400,
      );
    }

    // 2. Ambil data user (Siswa)
    const siswa = await prisma.pengguna.findUnique({ where: { id: userId } });
    if (!siswa) throw new AppError("Data siswa tidak ditemukan", 404);

    // LOGIKA METODE 1: BARCODE / QR CODE
    if (data.metode === "barcode") {
      if (!data.barcodeData)
        throw new AppError("Data barcode wajib dikirim", 400);
      // Validasi: Apakah QR Code yang discan cocok dengan NISN siswa yang sedang login?
      if (data.barcodeData !== siswa.nisn) {
        throw new AppError(
          "QR Code tidak cocok dengan kartu identitas Anda",
          403,
        );
      }
    }

    // LOGIKA METODE 2: LOKASI (GPS GEOFENCING)
    if (data.metode === "lokasi" || data.metode === "face") {
      if (!data.lintang || !data.bujur) {
        throw new AppError(
          "Akses lokasi (GPS) wajib diaktifkan untuk metode ini",
          400,
        );
      }

      if (!sekolah.latitude || !sekolah.longitude) {
        throw new AppError(
          "Admin sekolah belum mengatur titik koordinat sekolah",
          400,
        );
      }

      const jarak = hitungJarakMeter(
        data.lintang,
        data.bujur,
        sekolah.latitude,
        sekolah.longitude,
      );

      const radiusMaks = sekolah.radiusAbsensi || 50; // Default 50 meter

      if (jarak > radiusMaks) {
        throw new AppError(
          `Anda berada ${Math.round(jarak)} meter dari sekolah. Anda harus berada di dalam radius ${radiusMaks} meter untuk absen.`,
          403,
        );
      }
    }
    
    // LOGIKA METODE 3: FACE RECOGNITION (Kirim ke Python)
    let urlFotoSaved = null;
    if (data.metode === "face") {
      if (!file) throw new AppError("Foto wajah wajib disertakan", 400);
      if (!siswa.avatar)
        throw new AppError(
          "Anda belum mengatur foto profil untuk dicocokkan",
          400,
        );

      const formData = new FormData();

      // Ambil URL dari .env, atau gunakan localhost sebagai fallback
      const aiServiceUrl =
        process.env.AI_SERVICE_URL || "http://localhost:8000";

      const aiResponse = await axios.post(
        `${aiServiceUrl}/verify-face`,
        formData,
        {
          headers: formData.getHeaders(),
        },
      );

      // Avatar profil asli siswa (path relatif dari backend)
      const masterPath = process.cwd() + siswa.avatar;
      formData.append("master_image", fs.createReadStream(masterPath));
      formData.append("snapshot_image", fs.createReadStream(file.path));

      try {
        // Panggil AI Microservice Python di port 8000
        const aiResponse = await axios.post(
          "http://localhost:8000/verify-face",
          formData,
          {
            headers: formData.getHeaders(),
          },
        );

        if (!aiResponse.data.matched) {
          throw new AppError(
            `Wajah tidak cocok: ${aiResponse.data.message}`,
            400,
          );
        }
      } catch (error: any) {
        throw new AppError(
          error.response?.data?.message ||
            "Gagal menghubungi AI Face Recognition Server",
          500,
        );
      }

      urlFotoSaved = `/uploads/absensi/${file.filename}`;
    }

    // 3. Simpan ke Database jika semua validasi lolos
    const hariIni = new Date();
    hariIni.setHours(0, 0, 0, 0);

    const absensiSudahAda = await prisma.absensi.findFirst({
      where: { penggunaId: userId, kelasId: data.kelasId, tanggal: hariIni },
    });

    if (absensiSudahAda) {
      throw new AppError("Anda sudah melakukan absensi hari ini", 400);
    }

    const absensi = await prisma.absensi.create({
      data: {
        penggunaId: userId,
        kelasId: data.kelasId,
        tanggal: hariIni,
        status: data.status,
        keterangan: data.keterangan || null,
        metode: data.metode,
        lintang: data.lintang || null,
        bujur: data.bujur || null,
        urlFoto: urlFotoSaved, // Simpan path foto jepretan kamera
        dibuatOleh: userId,
      },
    });

    // Bersihkan file sementara jika berhasil
    if (file && data.metode !== "face") fs.unlinkSync(file.path);

    return successResponse(res, "Absensi berhasil dicatat", absensi, 201);
  } catch (error) {
    // Hapus file sampah jika terjadi error
    if (file) fs.unlinkSync(file.path);
    throw error;
  }
};

export const getAbsensiSaya = async (req: AuthRequest, res: Response) => {
  const absensi = await prisma.absensi.findMany({
    where: { penggunaId: req.user!.userId },
    orderBy: { dibuatPada: "desc" },
  });
  return successResponse(res, "Data absensi berhasil diambil", absensi);
};

export const getAbsensiKelas = async (req: AuthRequest, res: Response) => {
  const kelasId = req.params.kelasId as string;
  const { tanggal } = req.query;

  const where: any = { kelasId };
  if (tanggal) {
    const tanggalFilter = new Date(tanggal as string);
    tanggalFilter.setHours(0, 0, 0, 0);
    where.tanggal = tanggalFilter;
  }

  const absensi = await prisma.absensi.findMany({
    where,
    include: {
      pengguna: { select: { id: true, namaLengkap: true, nisn: true } },
    },
    orderBy: { dibuatPada: "desc" },
  });
  return successResponse(res, "Data absensi kelas berhasil diambil", absensi);
};
