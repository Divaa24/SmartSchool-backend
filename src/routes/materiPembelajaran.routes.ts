import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

import {
  getMateriPembelajaran,
  getMateriPembelajaranById,
  createMateriPembelajaran,
  updateMateriPembelajaran,
  deleteMateriPembelajaran,
} from "../controllers/materiPembelajaran.controller";

import { authenticate } from "../middlewares/auth.middleware";
import { requireTenant } from "../middlewares/tenant.middleware";

import {
  createMateriPembelajaranSchema,
  updateMateriPembelajaranSchema,
} from "../validations/materiPembelajaran.validation";

const router = Router();

const uploadDir = path.join(
  process.cwd(),
  "uploads",
  "materi"
);

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, {
    recursive: true,
  });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
  },

  filename: (_req, file, cb) => {
    const extension = path.extname(file.originalname);

    const filename =
      `${Date.now()}-${Math.round(Math.random() * 1e9)}${extension}`;

    cb(null, filename);
  },
});

const upload = multer({
  storage,

  limits: {
    fileSize: 100 * 1024 * 1024,
  },

  fileFilter: (_req, file, cb) => {
    const allowedMimeTypes = [
      "application/pdf",
      "video/mp4",
      "video/mpeg",
      "video/webm",
      "video/quicktime",
    ];

    if (!allowedMimeTypes.includes(file.mimetype)) {
      return cb(
        new Error("File hanya boleh PDF atau Video")
      );
    }

    cb(null, true);
  },
});

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

router.get(
  "/",
  getMateriPembelajaran
);

router.get(
  "/:id",
  getMateriPembelajaranById
);

router.post(
  "/",
  upload.single("file"),
  validate(createMateriPembelajaranSchema),
  createMateriPembelajaran
);

router.put(
  "/:id",
  upload.single("file"),
  validate(updateMateriPembelajaranSchema),
  updateMateriPembelajaran
);

router.delete(
  "/:id",
  deleteMateriPembelajaran
);

export default router;