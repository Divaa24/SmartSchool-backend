import { Router } from "express";
import {
  createKategoriArtikel,
  getKategoriArtikel,
  updateKategoriArtikel,
  deleteKategoriArtikel,
  createArtikelCms,
  getArtikelCms,
  updateArtikelCms,
  deleteArtikelCms,
  createHalamanCms,
  getHalamanCms,
  updateHalamanCms,
  deleteHalamanCms,
} from "../controllers/cms.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { authorizeRoles } from "../middlewares/role.middleware";
import { requireTenant } from "../middlewares/tenant.middleware";

const router = Router();

router.use(authenticate, requireTenant, authorizeRoles("admin_sekolah"));

router.post("/kategori-artikel", createKategoriArtikel);
router.get("/kategori-artikel", getKategoriArtikel);
router.put("/kategori-artikel/:id", updateKategoriArtikel);
router.delete("/kategori-artikel/:id", deleteKategoriArtikel);

router.post("/artikel", createArtikelCms);
router.get("/artikel", getArtikelCms);
router.put("/artikel/:id", updateArtikelCms);
router.delete("/artikel/:id", deleteArtikelCms);

router.post("/halaman", createHalamanCms);
router.get("/halaman", getHalamanCms);
router.put("/halaman/:id", updateHalamanCms);
router.delete("/halaman/:id", deleteHalamanCms);

export default router;
