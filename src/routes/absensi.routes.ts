import { Router } from "express";
import { createAbsensi, getAbsensiSaya, getAbsensiKelas } from "../controllers/absensi.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { requireTenant } from "../middlewares/tenant.middleware";

const router = Router();

router.use(authenticate, requireTenant);

router.post("/", createAbsensi);
router.get("/saya", getAbsensiSaya);
router.get("/kelas/:kelasId", getAbsensiKelas);

export default router;