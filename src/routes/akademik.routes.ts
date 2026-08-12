import { Router } from "express";
import {
  createTahunAjaran,
  updateTahunAjaran,
  getTahunAjaran,
  createKelas,
  getKelas
} from "../controllers/akademik.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { authorizeRoles } from "../middlewares/role.middleware";
import { requireTenant } from "../middlewares/tenant.middleware";

const router = Router();

router.use(authenticate, requireTenant);

// Tahun Ajaran routes
router.post("/tahun-ajaran", authorizeRoles("admin_sekolah"), createTahunAjaran);
router.put("/tahun-ajaran/:id", authorizeRoles("admin_sekolah"), updateTahunAjaran);
router.get("/tahun-ajaran", getTahunAjaran);

// Kelas routes
router.post("/kelas", authorizeRoles("admin_sekolah"), createKelas);
router.get("/kelas", getKelas);

export default router;
