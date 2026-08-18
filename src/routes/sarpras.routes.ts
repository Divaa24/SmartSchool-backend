import { Router } from "express";
import {
  createGudang,
  getGudang,
  updateGudang,
  deleteGudang,
  createKategoriAset,
  getKategoriAset,
  updateKategoriAset,
  deleteKategoriAset,
  createAset,
  getAset,
  updateAset,
  deleteAset,
} from "../controllers/sarpras.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { authorizeRoles } from "../middlewares/role.middleware";
import { requireTenant } from "../middlewares/tenant.middleware";

const router = Router();

router.use(authenticate, requireTenant, authorizeRoles("admin_sekolah"));

router.post("/gudang", createGudang);
router.get("/gudang", getGudang);
router.put("/gudang/:id", updateGudang);
router.delete("/gudang/:id", deleteGudang);

router.post("/kategori", createKategoriAset);
router.get("/kategori", getKategoriAset);
router.put("/kategori/:id", updateKategoriAset);
router.delete("/kategori/:id", deleteKategoriAset);

router.post("/aset", createAset);
router.get("/aset", getAset);
router.put("/aset/:id", updateAset);
router.delete("/aset/:id", deleteAset);

export default router;
