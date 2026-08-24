import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("⏳ Memulai eksekusi database seeder lengkap...");

  const defaultPassword = await bcrypt.hash("Password123!", 10);

  // 1. SEED PERAN (ROLES)
  console.log("🔹 1. Seeding Data Peran (Roles)...");
  const daftarPeran = [
    {
      nama: "super_admin",
      namaTampilan: "Super Admin",
      deskripsi: "Administrator tertinggi platform",
    },
    {
      nama: "admin_yayasan",
      namaTampilan: "Admin Yayasan",
      deskripsi: "Pengelola naungan yayasan",
    },
    {
      nama: "admin_sekolah",
      namaTampilan: "Admin Sekolah",
      deskripsi: "Administrator tenant sekolah",
    },
    {
      nama: "guru",
      namaTampilan: "Guru",
      deskripsi: "Tenaga pendidik / pengajar",
    },
    { nama: "siswa", namaTampilan: "Siswa", deskripsi: "Peserta didik" },
  ];

  const peranMap: Record<string, string> = {};
  for (const peran of daftarPeran) {
    const res = await prisma.peran.upsert({
      where: { nama: peran.nama },
      update: {
        namaTampilan: peran.namaTampilan,
        deskripsi: peran.deskripsi,
        status: "aktif",
      },
      create: { ...peran, status: "aktif" },
    });
    peranMap[peran.nama] = res.id;
  }

  // 2. SEED MODUL
  console.log("🔹 2. Seeding Data Modul...");
  const daftarModul = [
    {
      kode: "MOD_USER",
      nama: "Manajemen Pengguna",
      deskripsi: "Pengelolaan data akun dan hak akses pengguna",
      ikon: "users",
    },
    {
      kode: "MOD_SCH",
      nama: "Manajemen Sekolah",
      deskripsi: "Pengaturan identitas sekolah dan tenant",
      ikon: "building",
    },
    {
      kode: "MOD_AKD",
      nama: "Akademik",
      deskripsi: "Manajemen tahun ajaran, kelas, dan mata pelajaran",
      ikon: "book-open",
    },
    {
      kode: "MOD_TGS",
      nama: "Tugas",
      deskripsi: "Penugasan dan pengumpulan tugas siswa",
      ikon: "clipboard-list",
    },
    {
      kode: "MOD_UJN",
      nama: "Ujian",
      deskripsi: "Sistem ujian online dan CBT",
      ikon: "file-text",
    },
    {
      kode: "MOD_AST",
      nama: "Manajemen Aset",
      deskripsi: "Inventaris sarana dan prasarana sekolah",
      ikon: "archive",
    },
    {
      kode: "MOD_CMS",
      nama: "CMS",
      deskripsi: "Konten artikel dan halaman profil publik",
      ikon: "globe",
    },
    {
      kode: "MOD_PDB",
      nama: "PPDB",
      deskripsi: "Penerimaan Peserta Didik Baru",
      ikon: "user-plus",
    },
    {
      kode: "MOD_LMS",
      nama: "LMS",
      deskripsi: "Learning Management System dan Kuis",
      ikon: "monitor",
    },
    {
      kode: "MOD_LAP",
      nama: "Laporan",
      deskripsi: "Laporan presensi, nilai, dan statistik sekolah",
      ikon: "bar-chart-2",
    },
  ];

  const modulMap: Record<string, string> = {};
  for (const modul of daftarModul) {
    const res = await prisma.modul.upsert({
      where: { kode: modul.kode },
      update: {
        nama: modul.nama,
        deskripsi: modul.deskripsi,
        ikon: modul.ikon,
        status: "aktif",
      },
      create: { ...modul, sistem: true, status: "aktif" },
    });
    modulMap[modul.kode] = res.id;
  }

  // 3. SEED IZIN (PERMISSIONS) & PERAN_IZIN
  console.log("🔹 3. Seeding Data Izin & PeranIzin...");
  const actions = ["create", "read", "update", "delete"];
  const izinIds: string[] = [];

  for (const modul of daftarModul) {
    for (const action of actions) {
      const namaIzin = `${modul.kode.toLowerCase()}_${action}`;
      const res = await prisma.izin.upsert({
        where: { nama: namaIzin },
        update: { modul: modul.nama, aksi: action, status: "aktif" },
        create: {
          nama: namaIzin,
          modul: modul.nama,
          aksi: action,
          status: "aktif",
        },
      });
      izinIds.push(res.id);
    }
  }

  // Assign seluruh izin ke Super Admin & Admin Sekolah
  const rolesToAssign = [peranMap["super_admin"], peranMap["admin_sekolah"]];
  for (const roleId of rolesToAssign) {
    if (!roleId) continue;
    for (const izinId of izinIds) {
      const existingPeranIzin = await prisma.peranIzin.findFirst({
        where: { peranId: roleId, izinId: izinId },
      });
      if (!existingPeranIzin) {
        await prisma.peranIzin.create({
          data: { peranId: roleId, izinId: izinId },
        });
      }
    }
  }

  // 4. SEED PAKET & PAKET_MODUL
  console.log("🔹 4. Seeding Data Paket Langganan & PaketModul...");
  const daftarPaket = [
    {
      nama: "Basic",
      deskripsi: "Paket uji coba fitur dasar sekolah selama 2 minggu (14 hari)",
      harga: 0,
      durasi: 14,
      moduls: ["MOD_USER", "MOD_AKD", "MOD_TGS"],
    },
    {
      nama: "Pro",
      deskripsi:
        "Paket lengkap untuk pengelolaan operasional sekolah semesteran (6 bulan / 180 hari)",
      harga: 1500000,
      durasi: 180,
      moduls: [
        "MOD_USER",
        "MOD_SCH",
        "MOD_AKD",
        "MOD_TGS",
        "MOD_UJN",
        "MOD_AST",
        "MOD_CMS",
      ],
    },
    {
      nama: "Enterprise",
      deskripsi:
        "Akses penuh seluruh modul ekosistem SmartSchool tahunan (12 bulan / 365 hari)",
      harga: 3000000,
      durasi: 365,
      moduls: Object.keys(modulMap),
    },
  ];

  const paketMap: Record<string, string> = {};
  for (const pkt of daftarPaket) {
    const existingPaket = await prisma.paket.findFirst({
      where: { nama: pkt.nama },
    });
    let paketId = existingPaket?.id;

    if (existingPaket) {
      await prisma.paket.update({
        where: { id: existingPaket.id },
        data: {
          deskripsi: pkt.deskripsi,
          harga: pkt.harga,
          durasi: pkt.durasi,
          status: "aktif",
        },
      });
    } else {
      const res = await prisma.paket.create({
        data: {
          nama: pkt.nama,
          deskripsi: pkt.deskripsi,
          harga: pkt.harga,
          durasi: pkt.durasi,
          status: "aktif",
        },
      });
      paketId = res.id;
    }

    if (paketId) {
      paketMap[pkt.nama] = paketId;
      for (const modKode of pkt.moduls) {
        const modId = modulMap[modKode];
        if (!modId) continue;
        const check = await prisma.paketModul.findFirst({
          where: { paketId: paketId, modulId: modId },
        });
        if (!check) {
          await prisma.paketModul.create({
            data: { paketId: paketId, modulId: modId, status: "aktif" },
          });
        }
      }
    }
  }

  // 5. SEED YAYASAN & SEKOLAH
  console.log("🔹 5. Seeding Data Yayasan & Sekolah...");
  const yayasan = await prisma.yayasan.upsert({
    where: { npyp: "YYS-001234" },
    update: {},
    create: {
      nama: "Yayasan Pendidikan Maju Bersama",
      alamat: "Jl. Pendidikan No. 45, Jakarta Selatan",
      telepon: "021-7890123",
      email: "info@yayasanmajubersama.sch.id",
      npyp: "YYS-001234",
      status: "aktif",
    },
  });

  const sekolah = await prisma.sekolah.upsert({
    where: { subdomain: "smpn1contoh" },
    update: {},
    create: {
      nama: "SMP Negeri 1 Contoh SmartSchool",
      subdomain: "smpn1contoh",
      kode: "SCH-SMP1",
      jenjang: "SMP",
      alamat: "Jl. Merdeka Belajar No. 10, Jakarta",
      telepon: "021-5556789",
      email: "admin@smpn1contoh.sch.id",
      status: "aktif",
      yayasanId: yayasan.id,
      konfigurasi: { jenjang: "SMP" },
    },
  });

  // Hubungkan langganan Enterprise aktif ke sekolah
  const enterprisePaketId = paketMap["Enterprise"];
  if (enterprisePaketId) {
    const existingLangganan = await prisma.langgananSekolah.findFirst({
      where: { sekolahId: sekolah.id },
    });
    if (!existingLangganan) {
      const now = new Date();
      const end = new Date(now);
      end.setDate(end.getDate() + 365);

      await prisma.langgananSekolah.create({
        data: {
          sekolahId: sekolah.id,
          paketId: enterprisePaketId,
          statusPembayaran: "success",
          statusLangganan: "active",
          tanggalMulai: now,
          tanggalBerakhir: end,
          hargaSaatBerlangganan: 3000000,
          siklusPenagihan: "annual",
        },
      });
    }
  }

  // 6. SEED PENGGUNA (USERS BY ROLE)
  console.log(
    "🔹 6. Seeding Data Pengguna (Super Admin, Admin Yayasan, Admin Sekolah, Guru, Siswa)...",
  );

  // 1. Super Admin
  await prisma.pengguna.upsert({
    where: { email: "superadmin@smartschool.com" },
    update: {},
    create: {
      namaPengguna: "superadmin",
      email: "superadmin@smartschool.com",
      kataSandi: defaultPassword,
      namaLengkap: "Super Administrator",
      peranId: peranMap["super_admin"],
      status: "aktif",
    },
  });

  // 2. Admin Yayasan
  await prisma.pengguna.upsert({
    where: { email: "admin.yayasan@smartschool.com" },
    update: {},
    create: {
      namaPengguna: "adminyayasan",
      email: "admin.yayasan@smartschool.com",
      kataSandi: defaultPassword,
      namaLengkap: "Drs. H. Bambang Sudarmono",
      peranId: peranMap["admin_yayasan"],
      yayasanId: yayasan.id,
      status: "aktif",
    },
  });

  // 3. Admin Sekolah
  await prisma.pengguna.upsert({
    where: { email: "admin.sekolah@smpn1contoh.sch.id" },
    update: {},
    create: {
      namaPengguna: "adminsekolah",
      email: "admin.sekolah@smpn1contoh.sch.id",
      kataSandi: defaultPassword,
      namaLengkap: "Siti Rahmawati, S.Pd (Admin)",
      peranId: peranMap["admin_sekolah"],
      sekolahId: sekolah.id,
      status: "aktif",
    },
  });

  // 4. Guru Pengajar
  await prisma.pengguna.upsert({
    where: { email: "guru.matematika@smpn1contoh.sch.id" },
    update: {},
    create: {
      namaPengguna: "gurumatematika",
      email: "guru.matematika@smpn1contoh.sch.id",
      kataSandi: defaultPassword,
      namaLengkap: "Budi Santoso, M.Pd",
      nip: "198501152010011005",
      nuptk: "9876543210123456",
      jenisKelamin: "Laki-laki",
      peranId: peranMap["guru"],
      sekolahId: sekolah.id,
      status: "aktif",
    },
  });

  // 5. Siswa
  await prisma.pengguna.upsert({
    where: { email: "siswa.contoh@smpn1contoh.sch.id" },
    update: {},
    create: {
      namaPengguna: "siswa001",
      email: "siswa.contoh@smpn1contoh.sch.id",
      kataSandi: defaultPassword,
      namaLengkap: "Ahmad Rizky Pratama",
      nisn: "0087654321",
      nis: "242507001",
      jenisKelamin: "Laki-laki",
      peranId: peranMap["siswa"],
      sekolahId: sekolah.id,
      status: "aktif",
    },
  });

  console.log("✅ Seluruh data Seeder berhasil dibuat!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeder:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
