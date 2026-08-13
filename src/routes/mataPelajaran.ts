import { Router } from "express";

import {
  getMataPelajaran,
  createMataPelajaran,
  updateMataPelajaran,
  deleteMataPelajaran,
} from "../controllers/mataPelajaran.controller";

const router = Router();

router.get("/", getMataPelajaran);

router.post("/", createMataPelajaran);

router.put("/:id", updateMataPelajaran);

router.delete("/:id", deleteMataPelajaran);

export default router;