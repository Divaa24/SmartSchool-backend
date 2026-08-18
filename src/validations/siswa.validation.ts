import { z } from "zod";

export const siswaSchema = z.object({
  namaLengkap: z.string().min(3, "Nama lengkap minimal 3 karakter"),
  email: z.string().email("Format email tidak valid"),
  nisn: z.string().min(5, "NISN tidak valid"),
  nis: z.string().optional(),
  kelasId: z.string().uuid("ID Kelas tidak valid"),
});
