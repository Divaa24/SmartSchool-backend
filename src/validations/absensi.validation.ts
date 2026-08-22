import { z } from "zod";

export const createAbsensiSchema = z.object({
  kelasMapelId: z.string().uuid(),
  jadwalMengajarId: z.string().uuid(),
  status: z.enum(["hadir", "izin", "sakit", "alpha"]),
  keterangan: z.string().optional(),
  metode: z.string().optional(),
  lintang: z.number().optional(),
  bujur: z.number().optional(),
  urlFoto: z.string().url().optional(),
});