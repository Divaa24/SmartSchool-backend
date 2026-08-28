import { Router } from "express";

import {
  daftarPpdb,
  uploadBerkasPpdb,
  verifikasiPpdb,
} from "../controllers/ppdb.controller";

import { authenticate } from "../middlewares/auth.middleware";
import { requireTenant } from "../middlewares/tenant.middleware";
import { authorizeRoles } from "../middlewares/role.middleware";

import { uploadPpdb } from "../middlewares/uploadPpdb.middleware";

const router = Router();

router.post(
  "/daftar",
  daftarPpdb
);

router.post(
  "/:id/berkas",
  uploadPpdb.single("file"),
  uploadBerkasPpdb
);

router.patch(
  "/:id/verifikasi",
  authenticate,
  requireTenant,
  authorizeRoles("admin_sekolah"),
  verifikasiPpdb
);

export default router;