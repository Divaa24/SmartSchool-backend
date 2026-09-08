import { Router } from "express";
import {
  createPayment,
  getPendingPayments,
  extendSubscription,
  getAllLanggananSekolah,
} from "../controllers/subscription.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { requireTenant } from "../middlewares/tenant.middleware";
import { authorizeRoles } from "../middlewares/role.middleware";

const router = Router();

router.get(
  "/",
  authenticate,
  authorizeRoles("super_admin"),
  getAllLanggananSekolah
);

router.post(
  "/bayar",
  authenticate,
  requireTenant,
  authorizeRoles("admin_sekolah"),
  createPayment
);

router.get(
  "/pending",
  authenticate,
  requireTenant,
  authorizeRoles("admin_sekolah"),
  getPendingPayments
);

router.post(
  "/perpanjang",
  authenticate,
  requireTenant,
  authorizeRoles("admin_sekolah"),
  extendSubscription
);

export default router;