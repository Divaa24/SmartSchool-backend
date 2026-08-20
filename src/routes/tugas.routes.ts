import { Router } from "express";
import {
  createTugas,
  getTugasByKelasMapel,
  getDetailTugas,
  updateTugas,
  deleteTugas,
  submitTugas,
  getPengumpulanByTugas,
  beriNilaiTugas,
} from "../controllers/tugas.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { authorizeRoles } from "../middlewares/role.middleware";
import { requireTenant } from "../middlewares/tenant.middleware";

const router = Router();

router.use(authenticate, requireTenant);

// Guru operations
router.post("/", authorizeRoles("guru"), createTugas);
router.put("/:id", authorizeRoles("guru"), updateTugas);
router.delete("/:id", authorizeRoles("guru"), deleteTugas);
router.get("/:id/pengumpulan", authorizeRoles("guru"), getPengumpulanByTugas);
router.patch(
  "/pengumpulan/:pengumpulanId/nilai",
  authorizeRoles("guru"),
  beriNilaiTugas,
);

// Shared / Siswa
router.get("/kelas-mapel/:kelasMapelId", getTugasByKelasMapel);
router.get("/:id", getDetailTugas);
router.post("/:id/submit", authorizeRoles("siswa"), submitTugas);

export default router;
