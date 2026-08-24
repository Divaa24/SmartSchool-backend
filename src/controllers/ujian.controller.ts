import { Request, Response, NextFunction } from "express";
import { prisma } from "../config/db";
import { AppError } from "../utils/appError";
import { successResponse } from "../utils/responseFormatter";
import { AuthRequest } from "../middlewares/auth.middleware";
import {
  createUjianSchema,
  updateUjianSchema,
  mulaiUjianSchema,
  submitUjianSchema,
} from "../validations/ujian.validation";

// === GURU: CREATE UJIAN ===
export const createUjian = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = (req as AuthRequest).user?.userId as string;
    const validated = createUjianSchema.parse(req.body);

    // Validasi apakah guru tersebut mengampu kelas mapel ini
    const checkKelasMapel = await prisma.kelasMapel.findFirst({
      where: { id: validated.kelasMapelId, guruPengajarId: userId },
    });

    if (!checkKelasMapel) {
      throw new AppError(
        "Kelas mapel tidak ditemukan atau Anda bukan pengampunya",
        403,
      );
    }

    const ujian = await prisma.ujian.create({
      data: {
        kelasMapelId: validated.kelasMapelId,
        judul: validated.judul,
        deskripsi: validated.deskripsi,
        jenis: validated.jenis,
        durasi: validated.durasi,
        waktuMulai: validated.waktuMulai
          ? new Date(validated.waktuMulai)
          : null,
        waktuSelesai: validated.waktuSelesai
          ? new Date(validated.waktuSelesai)
          : null,
        nilaiKelulusan: validated.nilaiKelulusan,
        modeUjian: validated.modeUjian,
        dipublikasikan: validated.dipublikasikan,
        penilaianOtomatis: validated.penilaianOtomatis,
        dibuatOleh: userId,
      },
    });

    return successResponse(res, "Ujian berhasil dibuat", ujian, 201);
  } catch (error) {
    next(error);
  }
};

// === BERSAMA: GET LIST UJIAN PER KELAS MAPEL ===
export const getUjianByKelasMapel = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const kelasMapelId = req.params.kelasMapelId as string;
    const role = (req as AuthRequest).user?.role;

    const filter: any = { kelasMapelId, dihapusPada: null };
    // Jika siswa, hanya tampilkan ujian yang sudah dipublikasikan
    if (role === "siswa") {
      filter.dipublikasikan = true;
    }

    const data = await prisma.ujian.findMany({
      where: filter,
      include: {
        _count: { select: { soalUjian: true, percobaanUjian: true } },
      },
      orderBy: { dibuatPada: "desc" },
    });

    return successResponse(res, "Berhasil mengambil daftar ujian", data);
  } catch (error) {
    next(error);
  }
};

// === BERSAMA: GET DETAIL UJIAN ===
export const getDetailUjian = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id as string;
    const role = (req as AuthRequest).user?.role;

    const ujian = await prisma.ujian.findFirst({
      where: { id, dihapusPada: null },
      include: {
        kelasMapel: { include: { mataPelajaran: true, kelas: true } },
        soalUjian: {
          select: {
            id: true,
            teksSoal: true,
            jenisSoal: true,
            pilihan: true,
            poin: true,
            nomorUrut: true,
            // Jika role guru, tampilkan kunci jawaban. Jika siswa, sembunyikan.
            jawabanBenar: role === "guru" ? true : false,
          },
          orderBy: { nomorUrut: "asc" },
        },
      },
    });

    if (!ujian) throw new AppError("Ujian tidak ditemukan", 404);

    return successResponse(res, "Berhasil mengambil detail ujian", ujian);
  } catch (error) {
    next(error);
  }
};

// === GURU: UPDATE UJIAN ===
export const updateUjian = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id as string;
    const validated = updateUjianSchema.parse(req.body);

    const existing = await prisma.ujian.findFirst({
      where: { id, dihapusPada: null },
    });
    if (!existing) throw new AppError("Ujian tidak ditemukan", 404);

    const ujian = await prisma.ujian.update({
      where: { id },
      data: {
        ...(validated.judul && { judul: validated.judul }),
        ...(validated.deskripsi !== undefined && {
          deskripsi: validated.deskripsi,
        }),
        ...(validated.jenis && { jenis: validated.jenis }),
        ...(validated.durasi !== undefined && { durasi: validated.durasi }),
        ...(validated.waktuMulai !== undefined && {
          waktuMulai: validated.waktuMulai
            ? new Date(validated.waktuMulai)
            : null,
        }),
        ...(validated.waktuSelesai !== undefined && {
          waktuSelesai: validated.waktuSelesai
            ? new Date(validated.waktuSelesai)
            : null,
        }),
        ...(validated.nilaiKelulusan !== undefined && {
          nilaiKelulusan: validated.nilaiKelulusan,
        }),
        ...(validated.dipublikasikan !== undefined && {
          dipublikasikan: validated.dipublikasikan,
        }),
      },
    });

    return successResponse(res, "Ujian berhasil diperbarui", ujian);
  } catch (error) {
    next(error);
  }
};

// === GURU: DELETE UJIAN (SOFT DELETE) ===
export const deleteUjian = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id as string;
    const existing = await prisma.ujian.findFirst({
      where: { id, dihapusPada: null },
    });
    if (!existing) throw new AppError("Ujian tidak ditemukan", 404);

    await prisma.ujian.update({
      where: { id },
      data: { dihapusPada: new Date() },
    });

    return successResponse(res, "Ujian berhasil dihapus");
  } catch (error) {
    next(error);
  }
};

// === SISWA: MULAI UJIAN (VALIDASI TOKEN) ===
export const mulaiPercobaanUjian = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const ujianId = req.params.id as string;
    const userId = (req as AuthRequest).user?.userId as string;
    const { token } = mulaiUjianSchema.parse(req.body);

    const ujian = await prisma.ujian.findFirst({
      where: { id: ujianId, dihapusPada: null, dipublikasikan: true },
    });

    if (!ujian)
      throw new AppError(
        "Ujian tidak ditemukan atau belum dipublikasikan",
        404,
      );

    // 1. Validasi Waktu Pelaksanaan Ujian
    const now = new Date();
    if (ujian.waktuMulai && now < ujian.waktuMulai) {
      throw new AppError("Waktu pelaksanaan ujian belum dimulai", 400);
    }
    if (ujian.waktuSelesai && now > ujian.waktuSelesai) {
      throw new AppError("Waktu pelaksanaan ujian telah berakhir", 400);
    }

    // 2. Validasi Token Ujian (Disimulasikan menggunakan 6 karakter awal ID Ujian huruf kapital)
    const validToken = ujian.id.replace(/-/g, "").substring(0, 6).toUpperCase();
    if (token.toUpperCase() !== validToken) {
      throw new AppError(
        `Token ujian tidak valid. (Gunakan: ${validToken} untuk testing)`,
        400,
      );
    }

    // 3. Cek Sesi Sebelumnya
    const existingSesi = await prisma.percobaanUjian.findFirst({
      where: { ujianId, penggunaId: userId },
    });

    if (existingSesi) {
      if (existingSesi.status === "selesai") {
        throw new AppError(
          "Anda sudah menyelesaikan ujian ini sebelumnya",
          400,
        );
      }
      return successResponse(
        res,
        "Melanjutkan sesi ujian yang sedang berjalan",
        existingSesi,
      );
    }

    // 4. Buat Sesi Baru
    const sesiBaru = await prisma.percobaanUjian.create({
      data: {
        ujianId,
        penggunaId: userId,
        dimulaiPada: now,
        status: "sedang_mengerjakan",
        dibuatOleh: userId,
      },
    });

    return successResponse(res, "Sesi ujian berhasil dimulai", sesiBaru, 201);
  } catch (error) {
    next(error);
  }
};

// === SISWA: SUBMIT JAWABAN & AUTO GRADE ===
export const submitJawabanDanSelesai = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const sesiId = req.params.sesiId as string;
    const userId = (req as AuthRequest).user?.userId as string;
    const { jawaban } = submitUjianSchema.parse(req.body);

    // Ambil data sesi ujian beserta relasi soal dan ujian
    const sesi = await prisma.percobaanUjian.findFirst({
      where: { id: sesiId, penggunaId: userId },
      include: {
        ujian: {
          include: { soalUjian: true },
        },
      },
    });

    if (!sesi) throw new AppError("Sesi ujian tidak ditemukan", 404);
    if (sesi.status === "selesai")
      throw new AppError("Sesi ujian sudah dikumpulkan sebelumnya", 400);

    const soalList = sesi.ujian.soalUjian;
    let totalPoinDiperoleh = 0;
    let totalPoinMaksimal = 0;
    let jumlahBenar = 0;
    let jumlahSalah = 0;
    let jumlahLewati = 0;

    // Mapping jawaban dari request body (SoalID -> Jawaban)
    const jawabanMap = new Map(jawaban.map((j) => [j.soalId, j.jawaban]));

    const payloadJawabanSiswa: any[] = [];

    // Logika Auto-Grading per soal
    for (const soal of soalList) {
      const poinSoal = Number(soal.poin) || 1;
      totalPoinMaksimal += poinSoal;

      const jawabanSiswa = jawabanMap.get(soal.id);

      // Jika jawaban kosong/dilewati
      if (!jawabanSiswa || jawabanSiswa.trim() === "") {
        jumlahLewati++;
        payloadJawabanSiswa.push({
          percobaanUjianId: sesi.id,
          soalId: soal.id,
          jawaban: null,
          nilai: 0,
          benar: false,
          dibuatOleh: userId,
        });
        continue;
      }

      // Jika soal berupa Pilihan Ganda (PG)
      if (
        soal.jenisSoal === "pilihan_ganda" ||
        soal.jenisSoal === "benar_salah"
      ) {
        const isBenar =
          soal.jawabanBenar?.trim().toUpperCase() ===
          jawabanSiswa.trim().toUpperCase();

        if (isBenar) {
          jumlahBenar++;
          totalPoinDiperoleh += poinSoal;
        } else {
          jumlahSalah++;
        }

        payloadJawabanSiswa.push({
          percobaanUjianId: sesi.id,
          soalId: soal.id,
          jawaban: jawabanSiswa,
          nilai: isBenar ? poinSoal : 0,
          benar: isBenar,
          dibuatOleh: userId,
        });
      } else {
        // Untuk tipe Essai, dinilai 0 secara default sampai guru menilai secara manual
        payloadJawabanSiswa.push({
          percobaanUjianId: sesi.id,
          soalId: soal.id,
          jawaban: jawabanSiswa,
          nilai: 0,
          benar: null,
          dibuatOleh: userId,
        });
      }
    }

    // Kalkulasi nilai akhir dalam skala 100
    const nilaiSkala100 =
      totalPoinMaksimal > 0
        ? (totalPoinDiperoleh / totalPoinMaksimal) * 100
        : 0;

    // Eksekusi Transaction ke Database (Simpan Jawaban, Hasil Ujian, dan Update Sesi)
    const hasil = await prisma.$transaction(async (tx) => {
      // 1. Simpan detail tiap jawaban
      await tx.jawabanUjian.createMany({
        data: payloadJawabanSiswa,
      });

      // 2. Simpan rekap hasil
      const hasilUjian = await tx.hasilUjian.create({
        data: {
          percobaanUjianId: sesi.id,
          totalNilai: Number(nilaiSkala100.toFixed(2)),
          jumlahBenar,
          jumlahSalah,
          jumlahLewati,
          dibuatOleh: userId,
        },
      });

      // 3. Update status percobaan ujian
      await tx.percobaanUjian.update({
        where: { id: sesi.id },
        data: {
          status: "selesai",
          selesaiPada: new Date(),
          nilai: Number(nilaiSkala100.toFixed(2)),
        },
      });

      return hasilUjian;
    });

    return successResponse(
      res,
      "Ujian berhasil diselesaikan. Nilai berhasil dikalkulasi.",
      hasil,
    );
  } catch (error) {
    next(error);
  }
};
