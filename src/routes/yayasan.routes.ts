import { Router } from "express";
import { 
  getSekolahBinaan, 
  getDashboardSummary, 
  getDetailSekolahBinaan 
} from "../controllers/yayasan.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { authorizeRoles } from "../middlewares/role.middleware";

const router = Router();

// Semua rute di bawah ini HANYA boleh diakses oleh admin_yayasan
router.use(authenticate, authorizeRoles("admin_yayasan"));

router.get("/summary", getDashboardSummary); // Metrik Dashboard (Kartu-kartu atas)
router.get("/sekolah", getSekolahBinaan);    // Tabel daftar sekolah binaan
router.get("/sekolah/:id", getDetailSekolahBinaan); // Detail satu sekolah

export default router;
