import { Router } from "express";
import {
  getGedung,
  createGedung,
  updateGedung,
  deleteGedung,
  getLantaiByGedung,
  createLantai,
  updateLantai,
  deleteLantai,
} from "../controllers/infrastruktur.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { requireTenant } from "../middlewares/tenant.middleware";
import { authorizeRoles } from "../middlewares/role.middleware";

const router = Router();

router.use(authenticate, requireTenant);

// Gedung
router.get("/gedung", getGedung);
router.post("/gedung", authorizeRoles("admin_sekolah"), createGedung);
router.put("/gedung/:id", authorizeRoles("admin_sekolah"), updateGedung);
router.delete("/gedung/:id", authorizeRoles("admin_sekolah"), deleteGedung);

// Lantai
router.get("/lantai/gedung/:gedungId", getLantaiByGedung);
router.post("/lantai", authorizeRoles("admin_sekolah"), createLantai);
router.put("/lantai/:id", authorizeRoles("admin_sekolah"), updateLantai);
router.delete("/lantai/:id", authorizeRoles("admin_sekolah"), deleteLantai);

export default router;
