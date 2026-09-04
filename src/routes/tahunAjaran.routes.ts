import { Router } from "express";
import {
  getTahunAjaran,
  createTahunAjaran,
  updateTahunAjaran,
  deleteTahunAjaran,
} from "../controllers/tahunAjaran.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", authenticate, getTahunAjaran);
router.post("/", authenticate, createTahunAjaran);
router.put("/:id", authenticate, updateTahunAjaran);
router.delete("/:id", authenticate, deleteTahunAjaran);

export default router;