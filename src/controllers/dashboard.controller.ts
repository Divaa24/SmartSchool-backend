import { Response } from "express";
import { prisma } from "../config/db";
import { AuthRequest } from "../middlewares/auth.middleware";
import { successResponse } from "../utils/responseFormatter";

export const getDashboardSekolah = async (req: AuthRequest, res: Response) => {
  try {
    const sekolahId = req.user?.sekolahId;
    if (!sekolahId)
      return res.status(403).json({ success: false, message: "Akses ditolak" });

    // 1. Total Entitas
    const [totalSiswa, totalGuru, totalKelas] = await Promise.all([
      prisma.pengguna.count({
        where: {
          sekolahId,
          peran: { nama: "siswa" },
          dihapusPada: null,
          status: "aktif",
        },
      }),
      prisma.pengguna.count({
        where: {
          sekolahId,
          peran: { nama: "guru" },
          dihapusPada: null,
          status: "aktif",
        },
      }),
      prisma.kelas.count({ where: { sekolahId, dihapusPada: null } }),
    ]);

    // 2. Statistik Kehadiran Hari Ini
    const hariIni = new Date();
    hariIni.setHours(0, 0, 0, 0);

    const absensiHariIni = await prisma.absensi.groupBy({
      by: ["status"],
      where: { kelas: { sekolahId }, tanggal: hariIni },
      _count: true,
    });

    const rekapKehadiran = { hadir: 0, izin: 0, sakit: 0, alpha: 0 };
    absensiHariIni.forEach((a) => {
      if (a.status.toLowerCase() === "h") rekapKehadiran.hadir = a._count;
      else if (a.status.toLowerCase() === "i") rekapKehadiran.izin = a._count;
      else if (a.status.toLowerCase() === "s") rekapKehadiran.sakit = a._count;
      else if (a.status.toLowerCase() === "a") rekapKehadiran.alpha = a._count;
    });

    // 3. Kalkulasi Persentase Kehadiran
    const persentaseHadir =
      totalSiswa > 0
        ? ((rekapKehadiran.hadir / totalSiswa) * 100).toFixed(1)
        : "0";

    return successResponse(res, "Berhasil mengambil statistik dashboard", {
      totalSiswa,
      totalGuru,
      totalKelas,
      persentaseHadir: `${persentaseHadir}%`,
      rekapKehadiran,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
