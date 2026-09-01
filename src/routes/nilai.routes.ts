import { Router } from "express";
import { exportRekapNilai } from "../controllers/nilai.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.get("/export", authenticate, exportRekapNilai);

export default router;