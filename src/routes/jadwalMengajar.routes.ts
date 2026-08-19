import { Router } from "express";
import {
  getJadwalMengajar,
  getJadwalMengajarById,
  createJadwalMengajar,
  updateJadwalMengajar,
  deleteJadwalMengajar,
} from "../controllers/jadwalMengajar.controller";

import { authenticate } from "../middlewares/auth.middleware";
import { requireTenant } from "../middlewares/tenant.middleware";

import {
  createJadwalMengajarSchema,
  updateJadwalMengajarSchema,
} from "../validations/jadwalMengajar.validation";

const router = Router();

const validate =
  (schema: any) =>
  (req: any, res: any, next: any) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Validasi gagal",
        errors: result.error.flatten(),
      });
    }

    req.body = result.data;
    next();
  };

router.use(authenticate);
router.use(requireTenant);

router.get("/", getJadwalMengajar);

router.get("/:id", getJadwalMengajarById);

router.post(
  "/",
  validate(createJadwalMengajarSchema),
  createJadwalMengajar
);

router.put(
  "/:id",
  validate(updateJadwalMengajarSchema),
  updateJadwalMengajar
);

router.delete(
  "/:id",
  deleteJadwalMengajar
);

export default router;