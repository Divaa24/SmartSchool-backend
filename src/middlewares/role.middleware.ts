import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth.middleware";
import { prisma } from "../config/db";

export const authorizeRoles = (...allowedRoles: string[]) => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized" });
      }

      if (!req.user.roleId) {
        return res.status(403).json({
          success: false,
          message: "Akses Ditolak: Peran pengguna tidak valid",
        });
      }

      const userRole = await prisma.peran.findUnique({
        where: { id: req.user.roleId },
        select: { nama: true },
      });

      if (!userRole || !allowedRoles.includes(userRole.nama)) {
        return res.status(403).json({
          success: false,
          message: "Akses Ditolak: Anda tidak memiliki izin untuk tindakan ini",
        });
      }

      next();
    } catch (error) {
      return res
        .status(500)
        .json({
          success: false,
          message: "Internal server error saat verifikasi peran",
        });
    }
  };
};
