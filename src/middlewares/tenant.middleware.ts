import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth.middleware";

export const requireTenant = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  if (!req.user) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  if (!req.user.sekolahId) {
    return res.status(403).json({
      success: false,
      message: "Akses Ditolak: Anda tidak terhubung dengan sekolah manapun",
    });
  }

  next();
};
