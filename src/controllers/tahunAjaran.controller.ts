import { Request, Response } from "express";
import { prisma } from "../config/db";

interface TahunAjaranBody {
  nama: string;
  semester: "Ganjil" | "Genap";
  status?: "aktif" | "tidak_aktif";
}

export const getTahunAjaran = async (
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

    const data = await prisma.tahunAjaran.findMany({
      where: {
        sekolahId,
        dihapusPada: null,
      },
      orderBy: {
        nama: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      message: "Berhasil mengambil data tahun ajaran",
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


export const createTahunAjaran = async (
  req: Request<{}, {}, TahunAjaranBody>,
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
      semester,
      status = "tidak_aktif",
    } = req.body;

    if (!nama || !semester) {
      return res.status(400).json({
        success: false,
        message: "Nama tahun ajaran dan semester wajib diisi",
      });
    }

    if (!["Ganjil", "Genap"].includes(semester)) {
      return res.status(400).json({
        success: false,
        message: "Semester harus Ganjil atau Genap",
      });
    }

    if (!["aktif", "tidak_aktif"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status harus aktif atau tidak_aktif",
      });
    }

    // Cek apakah tahun ajaran + semester sudah ada
    const existing = await prisma.tahunAjaran.findFirst({
      where: {
        nama,
        semester,
        sekolahId,
        dihapusPada: null,
      },
    });

    if (existing) {
      return res.status(409).json({
        success: false,
        message: "Tahun ajaran dan semester tersebut sudah ada",
      });
    }

    // Jika dibuat aktif, nonaktifkan yang lain
    if (status === "aktif") {
      await prisma.tahunAjaran.updateMany({
        where: {
          sekolahId,
          status: "aktif",
          dihapusPada: null,
        },
        data: {
          status: "tidak_aktif",
        },
      });
    }

    const data = await prisma.tahunAjaran.create({
      data: {
        nama,
        semester,
        status,
        sekolahId,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Tahun ajaran berhasil ditambahkan",
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


export const updateTahunAjaran = async (
  req: Request<
    { id: string },
    {},
    Partial<TahunAjaranBody>
  >,
  res: Response
) => {
  try {
    const sekolahId = (req as any).user?.sekolahId;
    const { id } = req.params;

    if (!sekolahId) {
      return res.status(400).json({
        success: false,
        message: "Sekolah tidak ditemukan",
      });
    }

    const existing = await prisma.tahunAjaran.findFirst({
      where: {
        id,
        sekolahId,
        dihapusPada: null,
      },
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Tahun ajaran tidak ditemukan",
      });
    }

    const { nama, semester, status } = req.body;

    if (
      semester &&
      !["Ganjil", "Genap"].includes(semester)
    ) {
      return res.status(400).json({
        success: false,
        message: "Semester harus Ganjil atau Genap",
      });
    }

    if (
      status &&
      !["aktif", "tidak_aktif"].includes(status)
    ) {
      return res.status(400).json({
        success: false,
        message: "Status harus aktif atau tidak_aktif",
      });
    }

    if (status === "aktif") {
      await prisma.tahunAjaran.updateMany({
        where: {
          sekolahId,
          id: {
            not: id,
          },
          status: "aktif",
          dihapusPada: null,
        },
        data: {
          status: "tidak_aktif",
        },
      });
    }

    const data = await prisma.tahunAjaran.update({
      where: {
        id,
      },
      data: {
        ...(nama && { nama }),
        ...(semester && { semester }),
        ...(status && { status }),
      },
    });

    return res.status(200).json({
      success: true,
      message: "Tahun ajaran berhasil diperbarui",
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


export const deleteTahunAjaran = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const sekolahId = (req as any).user?.sekolahId;
    const { id } = req.params;

    const existing = await prisma.tahunAjaran.findFirst({
      where: {
        id,
        sekolahId,
        dihapusPada: null,
      },
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Tahun ajaran tidak ditemukan",
      });
    }

    await prisma.tahunAjaran.update({
      where: {
        id,
      },
      data: {
        dihapusPada: new Date(),
        status: "tidak_aktif",
      },
    });

    return res.status(200).json({
      success: true,
      message: "Tahun ajaran berhasil dihapus",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};