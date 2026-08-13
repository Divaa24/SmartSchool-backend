import { Router } from "express";

import {
  getKelasMapel,
  createKelasMapel,
  updateKelasMapel,
  deleteKelasMapel,
} from "../controllers/kelasMapel.controller";

const router = Router();

router.get("/", getKelasMapel);

router.post("/", createKelasMapel);

router.put("/:id", updateKelasMapel);

router.delete("/:id", deleteKelasMapel);

export default router;