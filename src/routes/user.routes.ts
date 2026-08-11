import { Router } from "express";
import { profile, updateProfile } from "../controllers/user.controller";

import { authenticate } from "../middlewares/auth.middleware";
import { requireTenant } from "../middlewares/tenant.middleware";

const router = Router();

router.get("/profile", authenticate, requireTenant, profile);
router.put("/profile", authenticate, requireTenant, updateProfile);

export default router; 