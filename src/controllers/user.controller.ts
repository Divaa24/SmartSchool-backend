import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { prisma } from "../config/db";
import bycrypt from "bcryptjs";

export const getUsers = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const users = await prisma.pengguna.findMany({
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
        status: true,
        dibuatPada: true,
        diperbaruiPada: true,

        sekolah: {
          select: {
            id: true,
            nama: true,
            kode: true,
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

    if (!users) {
      return res.status(404).json({
        success: false,
        message: "Pengguna tidak ditemukan",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Berhasil mengambil data pengguna",
      data: users,
    });
  } catch (error) {
    console.error("Error getUsers:", error);
    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan server",
    });
  }
};

export const createUser = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const {
      namaPengguna,
      email,
      kataSandi,
      namaLengkap,
      peranId,
      sekolahId,
      nipd,
      nip,
      nuptk,
      nisn,
      jenisKelamin,
      tempatLahir,
      tanggalLahir,
      alamat,
      noTelepon,
      avatar,
    } = req.body;

    if (
      !namaPengguna ||
      !email ||
      !kataSandi ||
      !namaLengkap ||
      !peranId 
    ) {
      return res.status(400).json({
        success: false,
        message: "Data tidak lengkap",
      });
    }
    const existingUser = await prisma.pengguna.findFirst({
      where: {
        OR: [
          { email },
          { namaPengguna },
        ],
      },
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email atau username sudah terdaftar",
      });
    }

    const role = await prisma.peran.findUnique({
      where: { id: peranId },
    });

    if (!role) {
      return res.status(400).json({
        success: false,
        message: "Role tidak ditemukan",
      });
    }

    const passwordHash = await bycrypt.hash(kataSandi, 10);

    const user = await prisma.pengguna.create({
      data: {
        namaPengguna,
        email,
        kataSandi: passwordHash,
        namaLengkap,
        peranId,
        sekolahId: sekolahId || null,

        nipd: nipd || null,
        nip: nip || null,
        nuptk: nuptk || null,
        nisn: nisn || null,

        jenisKelamin: jenisKelamin || null,
        tempatLahir: tempatLahir || null,
        tanggalLahir: tanggalLahir ? new Date(tanggalLahir) : null,
        alamat: alamat || null,
        noTelepon: noTelepon || null,
        avatar: avatar || null,

        status: "aktif",
      },

      select: {
        id: true,
        namaPengguna: true,
        email: true,
        namaLengkap: true,
        status: true,

        sekolah: {
          select: {
            id: true,
            nama: true,
          },
        },

        peran: {
          select: {
            id: true,
            nama: true,
            namaTampilan: true,
          },
        },
      }
    });

    return res.status(201).json({
      success: true,
      message: `${role.namaTampilan || role.nama} berhasil dibuat`,
      data: user,
    });
  } catch (error) {
    console.error("Error createUser:", error);
    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan server",
    });

  }
}

export const updateUser = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const  id  = req.params.id as string;

    const {
      namaPengguna,
      email,
      kataSandi,
      namaLengkap,
      peranId,
      sekolahId,
      nipd,
      nip,
      nuptk,
      nisn,
      jenisKelamin,
      tempatLahir,
      tanggalLahir,
      alamat,
      noTelepon,
      avatar,
      status,
    } = req.body;

    const existingUser = await prisma.pengguna.findUnique({
      where: { id },
    });

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "Pengguna tidak ditemukan",
      });
    }
    const data: any = {
      ...(namaPengguna !== undefined && { namaPengguna }),
      ...(email !== undefined && { email }),
      ...(namaLengkap !== undefined && { namaLengkap }),
      ...(peranId !== undefined && { peranId }),
      ...(sekolahId !== undefined && { sekolahId }),
      ...(nipd !== undefined && { nipd }),
      ...(nip !== undefined && { nip }),
      ...(nuptk !== undefined && { nuptk }),
      ...(nisn !== undefined && { nisn }),
      ...(jenisKelamin !== undefined && { jenisKelamin }),
      ...(tempatLahir !== undefined && { tempatLahir }),
      ...(tanggalLahir !== undefined && { tanggalLahir: new Date(tanggalLahir) }),
      ...(alamat !== undefined && { alamat }),
      ...(noTelepon !== undefined && { noTelepon }),
      ...(avatar !== undefined && { avatar }),
      ...(status !== undefined && { status }),
    };

    if(kataSandi) {
      data.kataSandi = await bycrypt.hash(kataSandi, 10);
    }

    const user = await prisma.pengguna.update({
      where: { id },
      data,
      select: {
        id: true,
        namaPengguna: true,
        email: true,
        namaLengkap: true,
        status: true,

        sekolah: {
          select: {
            id: true,
            nama: true,
          },
        },

        peran: {
          select: {
            id: true,
            nama: true,
            namaTampilan: true,
          },
        }
      }
    });

    return res.status(200).json({
      success: true,
      message: "Pengguna berhasil diperbarui",
      data: user,
    });
  } catch (error) {
    console.error("Error updateUser:", error);
    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan server",
    });
  };
}

export const deleteUser = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const  id  = req.params.id as string;

    const user = await prisma.pengguna.findUnique({
      where: { id },
    });

    if(!user) {
      return res.status(404).json({
        success: false,
        message: "Pengguna tidak ditemukan",
      });
    }

   const updatedUser = await prisma.pengguna.update({
      where: { id },
      data: {
        status: "nonaktif",
      }
    });

    return res.status(200).json({
      success: true,
      message: "Pengguna berhasil dihapus",
      data: user,
    });
  } catch (error) {
    console.error("Error deleteUser:", error);
    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan server",
    });
  }
}

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

