import { Router } from "express";
import { profile, updateProfile } from "../controllers/user.controller";

import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.get("/profile", authenticate, profile);
router.put("/profile", authenticate, updateProfile);

export default router; 