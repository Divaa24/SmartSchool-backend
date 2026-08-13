import { Request, Response } from "express";
import { prisma } from "../config/db";

interface KelasBody {
  nama: string;
  tingkat: number;
  tahunAjaranId: string;
  waliKelasId?: string;
}

export const getKelas = async (
  req: Request,
  res: Response
) => {
  try {
    const sekolahId = (req as any).user?.sekolahId;

    if (!sekolahId) {
      return res.status(400).json({
        success: false,
        message: "Sekolah tidak ditemukan",
      });
    }

    const data = await prisma.kelas.findMany({
      where: {
        sekolahId,
        dihapusPada: null,
      },
      include: {
        tahunAjaran: true,
        waliKelas: {
          select: {
            id: true,
            namaLengkap: true,
            email: true,
          },
        },
      },
      orderBy: {
        tingkat: "asc",
      },
    });

    return res.status(200).json({
      success: true,
      message: "Berhasil mengambil data kelas",
      data,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const createKelas = async (
  req: Request<{}, {}, KelasBody>,
  res: Response
) => {
  try {
    const sekolahId = (req as any).user?.sekolahId;

    if (!sekolahId) {
      return res.status(400).json({
        success: false,
        message: "Sekolah tidak ditemukan",
      });
    }

    const {
      nama,
      tingkat,
      tahunAjaranId,
      waliKelasId,
    } = req.body;

    if (!nama || !tingkat || !tahunAjaranId) {
      return res.status(400).json({
        success: false,
        message:
          "Nama, tingkat, dan tahun ajaran wajib diisi",
      });
    }

    const sekolah = await prisma.sekolah.findUnique({
      where: {
        id: sekolahId,
      },
      select: {
        jenjang: true,
      },
    });

    if (!sekolah) {
      return res.status(404).json({
        success: false,
        message: "Sekolah tidak ditemukan",
      });
    }

    const jenjang = sekolah.jenjang.toUpperCase();

    let tingkatValid = false;

    if (jenjang === "SD") {
      tingkatValid = tingkat >= 1 && tingkat <= 6;
    } else if (jenjang === "SMP") {
      tingkatValid = tingkat >= 7 && tingkat <= 9;
    } else if (
      jenjang === "SMA" ||
      jenjang === "SMK"
    ) {
      tingkatValid = tingkat >= 10 && tingkat <= 12;
    } else {
      return res.status(400).json({
        success: false,
        message: `Jenjang sekolah "${sekolah.jenjang}" belum didukung`,
      });
    }

    if (!tingkatValid) {
      return res.status(400).json({
        success: false,
        message: `Tingkat ${tingkat} tidak valid untuk sekolah ${jenjang}`,
      });
    }

    const tahunAjaran =
      await prisma.tahunAjaran.findFirst({
        where: {
          id: tahunAjaranId,
          sekolahId,
          dihapusPada: null,
        },
      });

    if (!tahunAjaran) {
      return res.status(404).json({
        success: false,
        message: "Tahun ajaran tidak ditemukan",
      });
    }

    if (waliKelasId) {
      const waliKelas =
        await prisma.pengguna.findFirst({
          where: {
            id: waliKelasId,
            sekolahId,
            dihapusPada: null,
          },
        });

      if (!waliKelas) {
        return res.status(404).json({
          success: false,
          message: "Wali kelas tidak ditemukan",
        });
      }
    }

    const existing = await prisma.kelas.findFirst({
      where: {
        nama,
        tahunAjaranId,
        sekolahId,
        dihapusPada: null,
      },
    });

    if (existing) {
      return res.status(409).json({
        success: false,
        message: "Kelas tersebut sudah ada",
      });
    }

    const data = await prisma.kelas.create({
      data: {
        nama,
        tingkat,
        sekolahId,
        tahunAjaranId,
        waliKelasId,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Kelas berhasil ditambahkan",
      data,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updateKelas = async (
  req: Request<
    { id: string },
    {},
    Partial<KelasBody>
  >,
  res: Response
) => {
  try {
    const sekolahId = (req as any).user?.sekolahId;
    const { id } = req.params;

    const existing = await prisma.kelas.findFirst({
      where: {
        id,
        sekolahId,
        dihapusPada: null,
      },
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Kelas tidak ditemukan",
      });
    }

    const {
      nama,
      tingkat,
      tahunAjaranId,
      waliKelasId,
    } = req.body;

    if (tingkat !== undefined) {
      const sekolah =
        await prisma.sekolah.findUnique({
          where: {
            id: sekolahId,
          },
          select: {
            jenjang: true,
          },
        });

      if (!sekolah) {
        return res.status(404).json({
          success: false,
          message: "Sekolah tidak ditemukan",
        });
      }

      const jenjang =
        sekolah.jenjang.toUpperCase();

      let valid = false;

      if (jenjang === "SD") {
        valid = tingkat >= 1 && tingkat <= 6;
      } else if (jenjang === "SMP") {
        valid = tingkat >= 7 && tingkat <= 9;
      } else if (
        jenjang === "SMA" ||
        jenjang === "SMK"
      ) {
        valid = tingkat >= 10 && tingkat <= 12;
      }

      if (!valid) {
        return res.status(400).json({
          success: false,
          message: `Tingkat ${tingkat} tidak valid untuk ${jenjang}`,
        });
      }
    }

    if (tahunAjaranId) {
      const tahunAjaran =
        await prisma.tahunAjaran.findFirst({
          where: {
            id: tahunAjaranId,
            sekolahId,
            dihapusPada: null,
          },
        });

      if (!tahunAjaran) {
        return res.status(404).json({
          success: false,
          message: "Tahun ajaran tidak ditemukan",
        });
      }
    }

    const data = await prisma.kelas.update({
      where: {
        id,
      },
      data: {
        ...(nama && { nama }),
        ...(tingkat !== undefined && {
          tingkat,
        }),
        ...(tahunAjaranId && {
          tahunAjaranId,
        }),
        ...(waliKelasId !== undefined && {
          waliKelasId,
        }),
      },
    });

    return res.status(200).json({
      success: true,
      message: "Kelas berhasil diperbarui",
      data,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const deleteKelas = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const sekolahId = (req as any).user?.sekolahId;
    const { id } = req.params;

    const existing = await prisma.kelas.findFirst({
      where: {
        id,
        sekolahId,
        dihapusPada: null,
      },
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Kelas tidak ditemukan",
      });
    }

    await prisma.kelas.update({
      where: {
        id,
      },
      data: {
        dihapusPada: new Date(),
      },
    });

    return res.status(200).json({
      success: true,
      message: "Kelas berhasil dihapus",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};