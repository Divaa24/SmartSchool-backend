import { Router } from "express";
import {
  createUjian,
  getUjianByKelasMapel,
  getDetailUjian,
  updateUjian,
  deleteUjian,
  mulaiPercobaanUjian,
  submitJawabanDanSelesai,
} from "../controllers/ujian.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { authorizeRoles } from "../middlewares/role.middleware";
import { requireTenant } from "../middlewares/tenant.middleware";

const router = Router();

router.use(authenticate, requireTenant);

// Guru operations
router.post("/", authorizeRoles("guru"), createUjian);
router.put("/:id", authorizeRoles("guru"), updateUjian);
router.delete("/:id", authorizeRoles("guru"), deleteUjian);

// Shared / Siswa
router.get("/kelas-mapel/:kelasMapelId", getUjianByKelasMapel);
router.get("/:id", getDetailUjian);
router.post("/:id/mulai", authorizeRoles("siswa"), mulaiPercobaanUjian);
router.post("/sesi/:sesiId/submit", authorizeRoles("siswa"), submitJawabanDanSelesai);

export default router;
