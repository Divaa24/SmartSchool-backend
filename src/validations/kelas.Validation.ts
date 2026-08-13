import { z } from "zod";

export const createKelasSchema = z.object({
  nama: z
    .string()
    .min(1, "Nama kelas wajib diisi")
    .max(50, "Nama kelas maksimal 50 karakter"),

  tingkat: z
    .number({
      message: "Tingkat harus berupa angka",
    })
    .int("Tingkat harus berupa angka bulat"),

  tahunAjaranId: z
    .string()
    .uuid("ID tahun ajaran tidak valid"),

  waliKelasId: z
    .string()
    .uuid("ID wali kelas tidak valid")
    .optional(),
});

export const updateKelasSchema = z.object({
  nama: z
    .string()
    .min(1, "Nama kelas tidak boleh kosong")
    .max(50, "Nama kelas maksimal 50 karakter")
    .optional(),

  tingkat: z
    .number({
      message: "Tingkat harus berupa angka",
    })
    .int("Tingkat harus berupa angka bulat")
    .optional(),

  tahunAjaranId: z
    .string()
    .uuid("ID tahun ajaran tidak valid")
    .optional(),

  waliKelasId: z
    .string()
    .uuid("ID wali kelas tidak valid")
    .nullable()
    .optional(),
});