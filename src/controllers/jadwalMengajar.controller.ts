import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { TokenPayLoad } from "../utils/generateToken";

interface AuthRequest extends Request {
    user?: TokenPayLoad;
}

const prisma = new PrismaClient();

const jadwalInclude = {
  kelasMapel: {
    include: {
      kelas: true,
      mataPelajaran: true,
      guruPengajar: {
        select: {
          id: true,
          namaLengkap: true,
          email: true,
          nip: true,
        },
      },
    },
  },
};

export const getJadwalMengajar = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const sekolahId = req.user?.sekolahId;

    if (!sekolahId) {
      return res.status(403).json({
        success: false,
        message: "Anda tidak terhubung dengan sekolah",
      });
    }

    const jadwal = await prisma.jadwalMengajar.findMany({
      where: {
        dihapusPada: null,
        kelasMapel: {
          kelas: {
            sekolahId,
          },
        },
      },
      include: jadwalInclude,
      orderBy: [
        {
          hari: "asc",
        },
        {
          jamMulai: "asc",
        },
      ],
    });

    return res.json({
      success: true,
      data: jadwal,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Gagal mengambil jadwal mengajar",
    });
  }
};

export const getJadwalMengajarById = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const id = req.params.id as string;
    const sekolahId = req.user?.sekolahId;

    const jadwal = await prisma.jadwalMengajar.findFirst({
      where: {
        id,
        dihapusPada: null,
        kelasMapel: {
          kelas: {
            sekolahId,
          },
        },
      },
      include: jadwalInclude,
    });

    if (!jadwal) {
      return res.status(404).json({
        success: false,
        message: "Jadwal mengajar tidak ditemukan",
      });
    }

    return res.json({
      success: true,
      data: jadwal,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Gagal mengambil jadwal mengajar",
    });
  }
};

export const createJadwalMengajar = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const {
      kelasMapelId,
      hari,
      jamMulai,
      jamSelesai,
      ruangan,
    } = req.body;

    const sekolahId = req.user?.sekolahId;
    const userId = req.user?.userId;

    if (!sekolahId) {
      return res.status(403).json({
        success: false,
        message: "Anda tidak terhubung dengan sekolah",
      });
    }

    // Pastikan kelas_mapel milik sekolah yang sedang login
    const kelasMapel = await prisma.kelasMapel.findFirst({
      where: {
        id: kelasMapelId,
        kelas: {
          sekolahId,
        },
      },
    });

    if (!kelasMapel) {
      return res.status(404).json({
        success: false,
        message: "Kelas mapel tidak ditemukan",
      });
    }

    // CEK BENTROK JADWAL GURU
    const bentrok = await prisma.jadwalMengajar.findFirst({
      where: {
        hari,
        dihapusPada: null,

        kelasMapel: {
          guruPengajarId: kelasMapel.guruPengajarId,
          kelas: {
            sekolahId,
          },
        },

        jamMulai: {
          lt: jamSelesai,
        },

        jamSelesai: {
          gt: jamMulai,
        },
      },
      include: jadwalInclude,
    });

    if (bentrok) {
      return res.status(409).json({
        success: false,
        message: "Jadwal guru bentrok dengan jadwal lain",
        data: {
          jadwalBentrok: bentrok,
        },
      });
    }

    const jadwal = await prisma.jadwalMengajar.create({
      data: {
        kelasMapelId,
        hari,
        jamMulai,
        jamSelesai,
        ruangan: ruangan || null,
        dibuatOleh: userId,
      },
      include: jadwalInclude,
    });

    return res.status(201).json({
      success: true,
      message: "Jadwal mengajar berhasil dibuat",
      data: jadwal,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Gagal membuat jadwal mengajar",
    });
  }
};

export const updateJadwalMengajar = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const id = req.params.id as string;

    const {
      kelasMapelId,
      hari,
      jamMulai,
      jamSelesai,
      ruangan,
    } = req.body;

    const sekolahId = req.user?.sekolahId;
    const userId = req.user?.userId;

    const existing = await prisma.jadwalMengajar.findFirst({
      where: {
        id,
        dihapusPada: null,
        kelasMapel: {
          kelas: {
            sekolahId,
          },
        },
      },
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Jadwal mengajar tidak ditemukan",
      });
    }

    const kelasMapel = await prisma.kelasMapel.findFirst({
      where: {
        id: kelasMapelId,
        kelas: {
          sekolahId,
        },
      },
    });

    if (!kelasMapel) {
      return res.status(404).json({
        success: false,
        message: "Kelas mapel tidak ditemukan",
      });
    }

    // CEK BENTROK
    const bentrok = await prisma.jadwalMengajar.findFirst({
      where: {
        id: {
          not: id,
        },

        hari,
        dihapusPada: null,

        kelasMapel: {
          guruPengajarId: kelasMapel.guruPengajarId,
          kelas: {
            sekolahId,
          },
        },

        jamMulai: {
          lt: jamSelesai,
        },

        jamSelesai: {
          gt: jamMulai,
        },
      },
      include: jadwalInclude,
    });

    if (bentrok) {
      return res.status(409).json({
        success: false,
        message: "Jadwal guru bentrok dengan jadwal lain",
        data: {
          jadwalBentrok: bentrok,
        },
      });
    }

    const jadwal = await prisma.jadwalMengajar.update({
      where: {
        id,
      },
      data: {
        kelasMapelId,
        hari,
        jamMulai,
        jamSelesai,
        ruangan: ruangan || null,
        diperbaruiOleh: userId,
      },
      include: jadwalInclude,
    });

    return res.json({
      success: true,
      message: "Jadwal mengajar berhasil diperbarui",
      data: jadwal,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Gagal memperbarui jadwal mengajar",
    });
  }
};

export const deleteJadwalMengajar = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const id = req.params.id as string;
    const sekolahId = req.user?.sekolahId;
    const userId = req.user?.userId;

    const jadwal = await prisma.jadwalMengajar.findFirst({
      where: {
        id,
        dihapusPada: null,
        kelasMapel: {
          kelas: {
            sekolahId,
          },
        },
      },
    });

    if (!jadwal) {
      return res.status(404).json({
        success: false,
        message: "Jadwal mengajar tidak ditemukan",
      });
    }

    await prisma.jadwalMengajar.update({
      where: {
        id,
      },
      data: {
        dihapusPada: new Date(),
        dihapusOleh: userId,
      },
    });

    return res.json({
      success: true,
      message: "Jadwal mengajar berhasil dihapus",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Gagal menghapus jadwal mengajar",
    });
  }
};