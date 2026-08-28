import { Router } from "express";

import {
  getJalurPpdb,
  getJalurPpdbById,
  createJalurPpdb,
  updateJalurPpdb,
  deleteJalurPpdb,
} from "../controllers/jalurPpdb.controller";

import { authenticate } from "../middlewares/auth.middleware";
import { requireTenant } from "../middlewares/tenant.middleware";
import { authorizeRoles } from "../middlewares/role.middleware";

const router = Router();

router.get(
  "/",
  authenticate,
  requireTenant,
  authorizeRoles("admin_sekolah"),
  getJalurPpdb
);

router.get(
  "/:id",
  authenticate,
  requireTenant,
  authorizeRoles("admin_sekolah"),
  getJalurPpdbById
);

router.post(
  "/",
  authenticate,
  requireTenant,
  authorizeRoles("admin_sekolah"),
  createJalurPpdb
);

router.put(
  "/:id",
  authenticate,
  requireTenant,
  authorizeRoles("admin_sekolah"),
  updateJalurPpdb
);

router.delete(
  "/:id",
  authenticate,
  requireTenant,
  authorizeRoles("admin_sekolah"),
  deleteJalurPpdb
);

export default router;