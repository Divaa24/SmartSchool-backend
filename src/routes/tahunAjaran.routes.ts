import { Router } from "express";

import {
  getTahunAjaran,
  createTahunAjaran,
  updateTahunAjaran,
  deleteTahunAjaran,
} from "../controllers/tahunAjaran.controller";

const router = Router();

router.get("/", getTahunAjaran);

router.post("/", createTahunAjaran);

router.put("/:id", updateTahunAjaran);

router.delete("/:id", deleteTahunAjaran);

export default router;