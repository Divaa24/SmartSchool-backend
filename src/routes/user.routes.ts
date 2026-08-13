import { Router } from "express";

import {
  profile,
  updateProfile,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller";

import { authenticate } from "../middlewares/auth.middleware";
import { requireTenant } from "../middlewares/tenant.middleware";
import { authorizeRoles } from "../middlewares/role.middleware";

const router = Router();

// PROFILE
router.get(
  "/profile",
  authenticate,
  requireTenant,
  profile
);

router.put(
  "/profile",
  authenticate,
  requireTenant,
  updateProfile
);

// CRUD PENGGUNA - SUPERADMIN
router.get(
  "/",
  authenticate,
  authorizeRoles("super_admin"),
  getUsers
);

router.post(
  "/",
  authenticate,
  authorizeRoles("super_admin"),
  createUser
);

router.put(
  "/:id",
  authenticate,
  authorizeRoles("super_admin"),
  updateUser
);

router.delete(
  "/:id",
  authenticate,
  authorizeRoles("super_admin"),
  deleteUser
);

export default router;