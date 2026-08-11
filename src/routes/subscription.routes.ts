import { Router } from "express";
import { createPayment } from "../controllers/subscription.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { requireTenant } from "../middlewares/tenant.middleware";
import { authorizeRoles } from "../middlewares/role.middleware";

const router = Router();

// Endpoint ini hanya boleh diakses oleh admin sekolah
router.post(
  "/bayar",
  authenticate,
  requireTenant,
  authorizeRoles("admin_sekolah"),
  createPayment,
);

export default router;
