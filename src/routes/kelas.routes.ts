import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validation.middleware";

import {
  createKelas,
  getKelas,
  updateKelas,
  deleteKelas,
} from "../controllers/kelas.controller";

import {
  createKelasSchema,
  updateKelasSchema,
} from "../validations/kelas.Validation";

const router = Router();

router.get(
  "/",
  authenticate,
  getKelas
);

router.post(
  "/",
  authenticate,
  validate(createKelasSchema),
  createKelas
);

router.put(
  "/:id",
  authenticate,
  validate(updateKelasSchema),
  updateKelas
);

router.delete(
  "/:id",
  authenticate,
  deleteKelas
);

export default router;