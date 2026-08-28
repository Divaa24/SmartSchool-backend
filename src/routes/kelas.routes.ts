import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { requireTenant } from "../middlewares/tenant.middleware";
import { authorizeRoles } from "../middlewares/role.middleware";
import {
  createKelas,
  getKelas,
  getDetailKelas,
  updateKelas,
  deleteKelas,
} from "../controllers/kelas.controller";

const router = Router();

router.use(authenticate, requireTenant);

router.get("/", getKelas);
router.get("/:id", getDetailKelas);
router.post("/", authorizeRoles("admin_sekolah"), createKelas);
router.put("/:id", authorizeRoles("admin_sekolah"), updateKelas);
router.delete("/:id", authorizeRoles("admin_sekolah"), deleteKelas);

export default router;
