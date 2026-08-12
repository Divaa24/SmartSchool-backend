import { Router } from "express";
import { getPaketPublic,
         getPaketPublicById,
         getFiturPublic,
         createPaket
 } from "../controllers/paket.controller";
import { authenticate } from "../middlewares/auth.middleware";

 const router = Router();

 router.get("/fitur/list", getFiturPublic);

 router.get("/", getPaketPublic);
 router.get("/:id", getPaketPublicById);
 router.post("/", authenticate, createPaket);

 export default router;