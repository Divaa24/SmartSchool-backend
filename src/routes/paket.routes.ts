import { Router } from "express";
import {
  getPaketPublic,
  getPaketPublicById,
  getFiturPublic,
  createPaket,
  updatePaket,
  deletePaket,
} from "../controllers/paket.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { authorizeRoles } from "../middlewares/role.middleware";

const router = Router();

// PUBLIC ROUTES (Tersedia untuk umum / landing page)
router.get("/fitur/list", getFiturPublic);
router.get("/", getPaketPublic);
router.get("/:id", getPaketPublicById);

// PROTECTED ROUTES (Hanya Super Admin)
router.post("/", authenticate, authorizeRoles("super_admin"), createPaket);
router.put("/:id", authenticate, authorizeRoles("super_admin"), updatePaket);
router.delete("/:id", authenticate, authorizeRoles("super_admin"), deletePaket);

export default router;
