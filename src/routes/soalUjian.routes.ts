import { Router } from "express";
import {
  createSoal,
  getSoalByUjian,
  getSoalById,
  updateSoal,
  deleteSoal,
} from "../controllers/soalUjian.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { requireTenant } from "../middlewares/tenant.middleware";

const router = Router();

router.use(authenticate, requireTenant);

router.post("/", createSoal);
router.get("/ujian/:ujianId", getSoalByUjian);
router.get("/:id", getSoalById);
router.put("/:id", updateSoal);
router.delete("/:id", deleteSoal);

export default router;