import { Response } from "express";
import { prisma } from "../config/db";
import { createAbsensiSchema } from "../validations/absensi.validation";
import { AppError } from "../utils/appError";
import { AuthRequest } from "../middlewares/auth.middleware";

export const createAbsensi = async (req: AuthRequest, res: Response) => {
  const data = createAbsensiSchema.parse(req.body);

  const jadwal = await prisma.jadwalMengajar.findUnique({
    where: { id: data.jadwalMengajarId },
    include: { kelasMapel: true },
  });

  if (!jadwal || jadwal.dihapusPada) {
    throw new AppError("Jadwal mengajar tidak ditemukan", 404);
  }

  if (jadwal.kelasMapelId !== data.kelasMapelId) {
    throw new AppError("Kelas mapel tidak sesuai dengan jadwal", 400);
  }

  const sekarang = new Date();
  const bagianJam = jadwal.jamMulai.split(":");
  const jamH = Number(bagianJam[0]);
  const jamM = Number(bagianJam[1]);

  const batasMulai = new Date(sekarang);
  batasMulai.setHours(jamH, jamM - 15, 0, 0);
  const batasSelesai = new Date(sekarang);
  batasSelesai.setHours(jamH, jamM + 15, 0, 0);

  if (sekarang < batasMulai || sekarang > batasSelesai) {
    throw new AppError("Absensi hanya bisa dilakukan dalam rentang 15 menit dari jam mulai", 400);
  }

  const hariIni = new Date();
  hariIni.setHours(0, 0, 0, 0);

  const absensiSudahAda = await prisma.absensi.findFirst({
    where: {
      penggunaId: req.user!.userId,
      kelasId: jadwal.kelasMapel.kelasId,
      tanggal: hariIni,
    },
  });

  if (absensiSudahAda) {
    throw new AppError("Anda sudah melakukan absensi hari ini untuk kelas ini", 400);
  }

  const absensi = await prisma.absensi.create({
    data: {
      penggunaId: req.user!.userId,
      kelasId: jadwal.kelasMapel.kelasId,
      tanggal: hariIni,
      status: data.status,
      keterangan: data.keterangan,
      metode: data.metode,
      lintang: data.lintang,
      bujur: data.bujur,
      urlFoto: data.urlFoto,
    },
  });

  res.status(201).json({
    success: true,
    message: "Absensi berhasil dicatat",
    data: absensi,
  });
};

export const getAbsensiSaya = async (req: AuthRequest, res: Response) => {
  const absensi = await prisma.absensi.findMany({
    where: { penggunaId: req.user!.userId },
    orderBy: { tanggal: "desc" },
  });

  res.status(200).json({
    success: true,
    message: "Data absensi berhasil diambil",
    data: absensi,
  });
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
    include: { pengguna: { select: { id: true, namaLengkap: true, nisn: true } } },
    orderBy: { dibuatPada: "desc" },
  });

  res.status(200).json({
    success: true,
    message: "Data absensi kelas berhasil diambil",
    data: absensi,
  });
};