import { Request, Response, NextFunction } from "express";
import { prisma } from "../config/db";
import { AppError } from "../utils/appError";
import { tahunAjaranSchema, kelasSchema } from "../validations/akademik.validation";

// === TAHUN AJARAN ===

export const createTahunAjaran = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sekolahId = (req as any).user?.sekolahId as string;
    if (!sekolahId) throw new AppError("Akses ditolak. Sekolah ID tidak ditemukan.", 403);

    const validatedData = tahunAjaranSchema.parse(req.body);

    if (validatedData.status === "aktif") {
      await prisma.$transaction([
        prisma.tahunAjaran.updateMany({
          where: { sekolahId },
          data: { status: "tidak_aktif" },
        }),
        prisma.tahunAjaran.create({
          data: {
            ...validatedData,
            sekolahId,
          },
        }),
      ]);
    } else {
      await prisma.tahunAjaran.create({
        data: {
          ...validatedData,
          sekolahId,
        },
      });
    }

    res.status(201).json({
      success: true,
      message: "Tahun Ajaran berhasil dibuat",
    });
  } catch (error) {
    next(error);
  }
};

export const updateTahunAjaran = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sekolahId = (req as any).user?.sekolahId as string;
    const id = req.params.id as string;

    const validatedData = tahunAjaranSchema.parse(req.body);

    if (validatedData.status === "aktif") {
      await prisma.$transaction([
        prisma.tahunAjaran.updateMany({
          where: { sekolahId, id: { not: id } },
          data: { status: "tidak_aktif" },
        }),
        prisma.tahunAjaran.update({
          where: { id },
          data: validatedData,
        }),
      ]);
    } else {
      await prisma.tahunAjaran.update({
        where: { id },
        data: validatedData,
      });
    }

    res.status(200).json({
      success: true,
      message: "Tahun Ajaran berhasil diperbarui",
    });
  } catch (error) {
    next(error);
  }
};

export const getTahunAjaran = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sekolahId = (req as any).user?.sekolahId as string;
    const data = await prisma.tahunAjaran.findMany({
      where: { sekolahId },
      orderBy: { dibuatPada: "desc" },
    });
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

// === KELAS ===

export const createKelas = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sekolahId = (req as any).user?.sekolahId as string;
    if (!sekolahId) throw new AppError("Akses ditolak. Sekolah ID tidak ditemukan.", 403);

    const validatedData = kelasSchema.parse(req.body);

    // Ambil data sekolah untuk validasi jenjang
    const sekolah = await prisma.sekolah.findUnique({
      where: { id: sekolahId },
    });

    if (!sekolah) throw new AppError("Sekolah tidak ditemukan", 404);

    const konfigurasi = sekolah.konfigurasi as { jenjang?: string } | null;
    const jenjang = konfigurasi?.jenjang;

    if (jenjang) {
      const { tingkat } = validatedData;
      if (jenjang === "SD" && (tingkat < 1 || tingkat > 6)) {
        throw new AppError("Untuk jenjang SD, tingkat kelas harus antara 1 dan 6", 400);
      } else if (jenjang === "SMP" && (tingkat < 7 || tingkat > 9)) {
        throw new AppError("Untuk jenjang SMP, tingkat kelas harus antara 7 dan 9", 400);
      } else if ((jenjang === "SMA" || jenjang === "SMK") && (tingkat < 10 || tingkat > 13)) {
        throw new AppError(`Untuk jenjang ${jenjang}, tingkat kelas harus antara 10 dan 13`, 400);
      }
    }

    const kelas = await prisma.kelas.create({
      data: {
        ...validatedData,
        sekolahId,
      },
    });

    res.status(201).json({
      success: true,
      message: "Kelas berhasil dibuat",
      data: kelas,
    });
  } catch (error) {
    next(error);
  }
};

export const getKelas = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sekolahId = (req as any).user?.sekolahId as string;
    const data = await prisma.kelas.findMany({
      where: { sekolahId },
      include: {
        tahunAjaran: true,
        waliKelas: {
          select: { id: true, namaLengkap: true }
        }
      },
      orderBy: [{ tingkat: "asc" }, { nama: "asc" }]
    });
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};
