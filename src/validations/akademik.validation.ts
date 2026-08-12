import { z } from "zod";

export const tahunAjaranSchema = z.object({
  nama: z.string().min(4, "Nama tahun ajaran wajib diisi (contoh: 2026/2027)"),
  semester: z.enum(["Ganjil", "Genap"]),
  status: z.enum(["aktif", "tidak_aktif"]).default("tidak_aktif"),
});

export const kelasSchema = z.object({
  nama: z.string().min(2, "Nama kelas wajib diisi"),
  tingkat: z.number().int().positive("Tingkat harus berupa angka positif"),
  tahunAjaranId: z.string().uuid("ID Tahun Ajaran tidak valid"),
  waliKelasId: z.string().uuid("ID Wali Kelas tidak valid").optional().nullable(),
});

export const siswaSchema = z.object({
  namaLengkap: z.string().min(3, "Nama lengkap wajib diisi"),
  email: z.string().email("Format email tidak valid"),
  nisn: z.string().min(5, "NISN wajib diisi"),
  nis: z.string().optional(),
  kelasId: z.string().uuid("ID Kelas tidak valid").optional(),
});
