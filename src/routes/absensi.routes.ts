import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import {
  createAbsensi,
  getAbsensiSaya,
  getAbsensiKelas,
} from "../controllers/absensi.controller";
import { exportRekapAbsensi } from "../controllers/absensi.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { requireTenant } from "../middlewares/tenant.middleware";

const router = Router();

// Siapkan folder penyimpanan foto absensi
const uploadDir = path.join(process.cwd(), "uploads", "absensi");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname) || ".jpg";
    cb(null, `absen-${Date.now()}${ext}`);
  },
});
const upload = multer({ storage });

router.use(authenticate, requireTenant);

// Tambahkan upload.single("snapshot")
router.post("/", upload.single("snapshot"), createAbsensi);
router.get("/saya", getAbsensiSaya);
router.get("/kelas/:kelasId", getAbsensiKelas);

router.get("/export", exportRekapAbsensi);

export default router;
