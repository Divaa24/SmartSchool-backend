import { Router } from "express";
import {
  register,
  verifyRegister,
  login,
  verifyLogin,
} from "../controllers/auth.controller";

const router = Router();

router.post("/register", register);
router.post("/verify-register", verifyRegister);
router.post("/login", login);
router.post("/verify-login", verifyLogin);

export default router;
