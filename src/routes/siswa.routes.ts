import { Router } from "express";
import { createSiswa } from "../controllers/siswa.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { authorizeRoles } from "../middlewares/role.middleware";
import { requireTenant } from "../middlewares/tenant.middleware";

const router = Router();

router.use(authenticate, requireTenant);

// Siswa routes
router.post("/", authorizeRoles("admin_sekolah"), createSiswa);

export default router;
