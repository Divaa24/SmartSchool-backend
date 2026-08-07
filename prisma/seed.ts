import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("⏳ Memulai seeder database...");

  const daftarPeran = [
    {
      nama: "super_admin",
      namaTampilan: "Super Admin",
      deskripsi: "Administrator tertinggi platform global",
    },
    {
      nama: "admin_sekolah",
      namaTampilan: "Admin Sekolah",
      deskripsi: "Administrator untuk satu tenant sekolah",
    },
    { nama: "guru", namaTampilan: "Guru", deskripsi: "Guru pengajar" },
    { nama: "siswa", namaTampilan: "Siswa", deskripsi: "Peserta didik" },
  ];

  for (const peran of daftarPeran) {
    await prisma.peran.upsert({
      where: { nama: peran.nama },
      update: {},
      create: peran,
    });
  }
  console.log("✅ Data Peran (Role) berhasil dibuat!");

  const peranSuperAdmin = await prisma.peran.findUnique({
    where: { nama: "super_admin" },
  });

  if (peranSuperAdmin) {
    const hashedPassword = await bcrypt.hash("SuperAdmin123!", 10);

    await prisma.pengguna.upsert({
      where: { email: "superadmin@smartschool.com" },
      update: {},
      create: {
        namaPengguna: "superadmin",
        email: "superadmin@smartschool.com",
        kataSandi: hashedPassword,
        namaLengkap: "Super Administrator",
        peranId: peranSuperAdmin.id,
        status: "aktif",
      },
    });
    console.log("✅ Akun Super Admin berhasil dibuat!");
  }

  console.log("🚀 Seeder selesai dieksekusi!");
}

main()
  .catch((e) => {
    console.error(e);

    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
