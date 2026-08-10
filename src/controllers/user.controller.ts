import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import {prisma} from "../config/db";

export const profile = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const user = await prisma.pengguna.findUnique({
      where: {
        id: req.user.userId,
      },

      select: {
        id: true,
        email: true,
        namaPengguna: true,
        namaLengkap: true,
        avatar: true,
        nipd: true,
        nip: true,
        nuptk: true,
        nisn: true,
        jenisKelamin: true,
        tempatLahir: true,
        tanggalLahir: true,
        alamat: true,
        noTelepon: true,
        status: true,
        terakhirLogin: true,
        dibuatPada: true,
        diperbaruiPada: true,
        diperbaruiOleh: true,

        sekolah: {
          select: {
            id: true,
            nama: true,
            subdomain: true,
            kode: true,
            alamat: true,
            telepon: true,
            email: true,
            logo: true,
            status: true,
          },
        },

        peran: {
          select: {
            id: true,
            nama: true,
            namaTampilan: true,
            deskripsi: true,
            status: true,
          },
        },
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Pengguna tidak ditemukan",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile berhasil diambil",
      data: user,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updateProfile = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const {
      namaLengkap,
      noTelepon,
      alamat,
      avatar,
    } = req.body;

    const user = await prisma.pengguna.update({
      where: {
        id: req.user.userId,
      },

      data: {
        ...(namaLengkap !== undefined && {
          namaLengkap,
        }),

        ...(noTelepon !== undefined && {
          noTelepon,
        }),

        ...(alamat !== undefined && {
          alamat,
        }),

        ...(avatar !== undefined && {
          avatar,
        }),
      },

      select: {
        id: true,
        namaLengkap: true,
        email: true,
        namaPengguna: true,
        avatar: true,
        noTelepon: true,
        alamat: true,
        status: true,

        sekolah: {
          select: {
            id: true,
            nama: true,
            subdomain: true,
          },
        },

        peran: {
          select: {
            id: true,
            nama: true,
            namaTampilan: true,
          },
        },
      },
    });

    return res.status(200).json({
      success: true,
      message: "Profile berhasil diupdate",
      data: user,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};