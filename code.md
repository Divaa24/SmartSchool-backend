# Project Structure

```
├── prisma
│   ├── migrations
│   │   ├── 20260807060159_init
│   │   │   └── migration.sql
│   │   └── migration_lock.toml
│   ├── schema.prisma
│   └── seed.ts
├── src
│   ├── config
│   │   └── db.ts
│   ├── controllers
│   │   ├── akademik.controller.ts
│   │   ├── auth.controller.ts
│   │   ├── kelas.controller.ts
│   │   ├── kelasMapel.controller.ts
│   │   ├── mataPelajaran.controller.ts
│   │   ├── paket.controller.ts
│   │   ├── siswa.controller.ts
│   │   ├── subscription.controller.ts
│   │   ├── tahunAjaran.controller.ts
│   │   ├── tenant.controller.ts
│   │   ├── user.controller.ts
│   │   ├── webhook.controller.ts
│   │   └── yayasan.controller.ts
│   ├── middlewares
│   │   ├── auth.middleware.ts
│   │   ├── error.middleware.ts
│   │   ├── role.middleware.ts
│   │   ├── tenant.middleware.ts
│   │   └── validation.middleware.ts
│   ├── routes
│   │   ├── akademik.routes.ts
│   │   ├── auth.routes.ts
│   │   ├── kelas.routes.ts
│   │   ├── kelasMapel.routes.ts
│   │   ├── mataPelajaran.ts
│   │   ├── paket.routes.ts
│   │   ├── siswa.routes.ts
│   │   ├── subscription.routes.ts
│   │   ├── tahunAjaran.routes.ts
│   │   ├── tenant.routes.ts
│   │   ├── user.routes.ts
│   │   ├── webhook.routes.ts
│   │   └── yayasan.routes.ts
│   ├── services
│   ├── utils
│   │   ├── appError.ts
│   │   ├── email.ts
│   │   ├── generateOtp.ts
│   │   ├── generateToken.ts
│   │   └── responseFormatter.ts
│   ├── validations
│   │   ├── akademik.validation.ts
│   │   ├── auth.validation.ts
│   │   ├── kelas.Validation.ts
│   │   ├── kelasMapel.validation.ts
│   │   ├── mataPelajaran.validation.ts
│   │   ├── subscription.validation.ts
│   │   ├── tahunAjaran.validation.ts
│   │   └── tenant.validation.ts
│   ├── app.ts
│   └── server.ts
├── package-lock.json
├── package.json
├── prisma.config.ts
├── test-api.ts
└── tsconfig.json
```

# File Contents

## prisma/migrations/20260807060159_init/migration.sql

```sql
-- CreateTable
CREATE TABLE "pengguna" (
    "id" TEXT NOT NULL,
    "sekolah_id" TEXT,
    "peran_id" TEXT,
    "dibuat_oleh" TEXT,
    "diperbarui_oleh" TEXT,
    "dihapus_oleh" TEXT,
    "nama_pengguna" VARCHAR(50) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "kata_sandi" VARCHAR(255) NOT NULL,
    "nama_lengkap" VARCHAR(100) NOT NULL,
    "avatar" VARCHAR(255),
    "nipd" VARCHAR(20),
    "nip" VARCHAR(20),
    "nuptk" VARCHAR(20),
    "nisn" VARCHAR(20),
    "jenis_kelamin" VARCHAR(10),
    "tempat_lahir" VARCHAR(50),
    "tanggal_lahir" DATE,
    "alamat" TEXT,
    "no_telepon" VARCHAR(20),
    "status" VARCHAR(20),
    "terakhir_login" TIMESTAMP,
    "kode_otp" VARCHAR(10),
    "otp_timeout" TIMESTAMP,
    "dibuat_pada" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diperbarui_pada" TIMESTAMP NOT NULL,
    "dihapus_pada" TIMESTAMP,

    CONSTRAINT "pengguna_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "peran" (
    "id" TEXT NOT NULL,
    "dibuat_oleh" TEXT,
    "diperbarui_oleh" TEXT,
    "dihapus_oleh" TEXT,
    "nama" VARCHAR(50) NOT NULL,
    "nama_tampilan" VARCHAR(100) NOT NULL,
    "deskripsi" TEXT,
    "status" VARCHAR(20),
    "dibuat_pada" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diperbarui_pada" TIMESTAMP NOT NULL,
    "dihapus_pada" TIMESTAMP,

    CONSTRAINT "peran_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "izin" (
    "id" TEXT NOT NULL,
    "dibuat_oleh" TEXT,
    "diperbarui_oleh" TEXT,
    "dihapus_oleh" TEXT,
    "nama" VARCHAR(100) NOT NULL,
    "modul" VARCHAR(50) NOT NULL,
    "aksi" VARCHAR(50) NOT NULL,
    "status" VARCHAR(20),
    "dibuat_pada" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diperbarui_pada" TIMESTAMP NOT NULL,
    "dihapus_pada" TIMESTAMP,

    CONSTRAINT "izin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "peran_izin" (
    "id" TEXT NOT NULL,
    "dibuat_oleh" TEXT,
    "diperbarui_oleh" TEXT,
    "dihapus_oleh" TEXT,
    "peran_id" TEXT NOT NULL,
    "izin_id" TEXT NOT NULL,
    "dibuat_pada" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diperbarui_pada" TIMESTAMP NOT NULL,
    "dihapus_pada" TIMESTAMP,

    CONSTRAINT "peran_izin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sekolah" (
    "id" TEXT NOT NULL,
    "yayasan_id" TEXT,
    "langganan_aktif_id" TEXT,
    "dibuat_oleh" TEXT,
    "diperbarui_oleh" TEXT,
    "dihapus_oleh" TEXT,
    "nama" VARCHAR(100) NOT NULL,
    "subdomain" VARCHAR(50) NOT NULL,
    "kode" VARCHAR(20) NOT NULL,
    "alamat" TEXT,
    "telepon" VARCHAR(20),
    "email" VARCHAR(100),
    "logo" VARCHAR(255),
    "status" VARCHAR(20),
    "konfigurasi" JSONB,
    "dibuat_pada" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diperbarui_pada" TIMESTAMP NOT NULL,
    "dihapus_pada" TIMESTAMP,

    CONSTRAINT "sekolah_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "yayasan" (
    "id" TEXT NOT NULL,
    "dibuat_oleh" TEXT,
    "diperbarui_oleh" TEXT,
    "dihapus_oleh" TEXT,
    "nama" VARCHAR(100) NOT NULL,
    "alamat" TEXT,
    "telepon" VARCHAR(20),
    "email" VARCHAR(100),
    "status" VARCHAR(20),
    "dibuat_pada" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diperbarui_pada" TIMESTAMP NOT NULL,
    "dihapus_pada" TIMESTAMP,

    CONSTRAINT "yayasan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "paket" (
    "id" TEXT NOT NULL,
    "dibuat_oleh" TEXT,
    "diperbarui_oleh" TEXT,
    "dihapus_oleh" TEXT,
    "nama" VARCHAR(100) NOT NULL,
    "deskripsi" TEXT,
    "harga" DECIMAL(15,2) NOT NULL,
    "durasi" INTEGER NOT NULL,
    "status" VARCHAR(20),
    "dibuat_pada" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diperbarui_pada" TIMESTAMP NOT NULL,
    "dihapus_pada" TIMESTAMP,

    CONSTRAINT "paket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "modul" (
    "id" TEXT NOT NULL,
    "dibuat_oleh" TEXT,
    "diperbarui_oleh" TEXT,
    "dihapus_oleh" TEXT,
    "kode" VARCHAR(20) NOT NULL,
    "nama" VARCHAR(100) NOT NULL,
    "deskripsi" TEXT,
    "ikon" VARCHAR(50),
    "sistem" BOOLEAN,
    "status" VARCHAR(20),
    "dibuat_pada" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diperbarui_pada" TIMESTAMP NOT NULL,
    "dihapus_pada" TIMESTAMP,

    CONSTRAINT "modul_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "paket_modul" (
    "id" TEXT NOT NULL,
    "paket_id" TEXT NOT NULL,
    "modul_id" TEXT NOT NULL,
    "dibuat_oleh" TEXT,
    "diperbarui_oleh" TEXT,
    "dihapus_oleh" TEXT,
    "status" VARCHAR(20),
    "dibuat_pada" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diperbarui_pada" TIMESTAMP NOT NULL,
    "dihapus_pada" TIMESTAMP,

    CONSTRAINT "paket_modul_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sekolah_modul" (
    "id" TEXT NOT NULL,
    "sekolah_id" TEXT NOT NULL,
    "modul_id" TEXT NOT NULL,
    "dibuat_oleh" TEXT,
    "diperbarui_oleh" TEXT,
    "dihapus_oleh" TEXT,
    "status" VARCHAR(20),
    "diaktifkan_pada" TIMESTAMP,
    "kedaluwarsa_pada" TIMESTAMP,
    "dibuat_pada" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diperbarui_pada" TIMESTAMP NOT NULL,
    "dihapus_pada" TIMESTAMP,

    CONSTRAINT "sekolah_modul_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "langganan_sekolah" (
    "id" TEXT NOT NULL,
    "sekolah_id" TEXT NOT NULL,
    "paket_id" TEXT NOT NULL,
    "dibuat_oleh" TEXT,
    "diperbarui_oleh" TEXT,
    "dihapus_oleh" TEXT,
    "status_pembayaran" VARCHAR(20),
    "status_langganan" VARCHAR(20),
    "tanggal_mulai" TIMESTAMP,
    "tanggal_berakhir" TIMESTAMP,
    "harga_saat_berlangganan" DECIMAL(15,2),
    "siklus_penagihan" VARCHAR(20),
    "fitur_aktif" JSONB,
    "xendit_invoice_id" VARCHAR(100),
    "xendit_payment_link" VARCHAR(255),
    "dibuat_pada" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diperbarui_pada" TIMESTAMP NOT NULL,

    CONSTRAINT "langganan_sekolah_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "riwayat_pembayaran" (
    "id" TEXT NOT NULL,
    "langganan_sekolah_id" TEXT NOT NULL,
    "sekolah_id" TEXT NOT NULL,
    "dibuat_oleh" TEXT,
    "diperbarui_oleh" TEXT,
    "dihapus_oleh" TEXT,
    "jumlah" DECIMAL(15,2),
    "metode" VARCHAR(50),
    "status" VARCHAR(20),
    "xendit_payment_id" VARCHAR(100),
    "xendit_invoice_id" VARCHAR(100),
    "webhook_raw_payload" JSONB,
    "dibuat_pada" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "riwayat_pembayaran_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifikasi" (
    "id" TEXT NOT NULL,
    "pengguna_id" TEXT NOT NULL,
    "pengirim_id" TEXT,
    "judul" VARCHAR(100) NOT NULL,
    "isi" TEXT NOT NULL,
    "tipe" VARCHAR(20),
    "kategori" VARCHAR(30),
    "target_url" VARCHAR(255),
    "dibaca" BOOLEAN NOT NULL DEFAULT false,
    "dibaca_pada" TIMESTAMP,
    "dikirim_email" BOOLEAN NOT NULL DEFAULT false,
    "dibuat_pada" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notifikasi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tahun_ajaran" (
    "id" TEXT NOT NULL,
    "sekolah_id" TEXT NOT NULL,
    "dibuat_oleh" TEXT,
    "diperbarui_oleh" TEXT,
    "dihapus_oleh" TEXT,
    "tahun_ajaran" VARCHAR(20) NOT NULL,
    "semester" VARCHAR(10) NOT NULL,
    "tanggal_mulai" DATE,
    "tanggal_selesai" DATE,
    "status" VARCHAR(20),
    "dibuat_pada" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diperbarui_pada" TIMESTAMP NOT NULL,
    "dihapus_pada" TIMESTAMP,

    CONSTRAINT "tahun_ajaran_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kelas" (
    "id" TEXT NOT NULL,
    "sekolah_id" TEXT NOT NULL,
    "tahun_ajaran_id" TEXT NOT NULL,
    "wali_kelas_id" TEXT,
    "dibuat_oleh" TEXT,
    "diperbarui_oleh" TEXT,
    "dihapus_oleh" TEXT,
    "nama" VARCHAR(50) NOT NULL,
    "tingkat" VARCHAR(20) NOT NULL,
    "ruangan" VARCHAR(20),
    "kapasitas" INTEGER,
    "status" VARCHAR(20),
    "dibuat_pada" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diperbarui_pada" TIMESTAMP NOT NULL,
    "dihapus_pada" TIMESTAMP,

    CONSTRAINT "kelas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mata_pelajaran" (
    "id" TEXT NOT NULL,
    "sekolah_id" TEXT NOT NULL,
    "dibuat_oleh" TEXT,
    "diperbarui_oleh" TEXT,
    "dihapus_oleh" TEXT,
    "nama" VARCHAR(100) NOT NULL,
    "kode" VARCHAR(20) NOT NULL,
    "status" VARCHAR(20),
    "dibuat_pada" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diperbarui_pada" TIMESTAMP NOT NULL,
    "dihapus_pada" TIMESTAMP,

    CONSTRAINT "mata_pelajaran_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kelas_mapel" (
    "id" TEXT NOT NULL,
    "kelas_id" TEXT NOT NULL,
    "mata_pelajaran_id" TEXT NOT NULL,
    "guru_pengajar_id" TEXT NOT NULL,
    "dibuat_oleh" TEXT,
    "diperbarui_oleh" TEXT,
    "dihapus_oleh" TEXT,
    "status" VARCHAR(20),
    "dibuat_pada" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diperbarui_pada" TIMESTAMP NOT NULL,

    CONSTRAINT "kelas_mapel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "siswa_kelas" (
    "id" TEXT NOT NULL,
    "kelas_id" TEXT NOT NULL,
    "pengguna_id" TEXT NOT NULL,
    "tahun_ajaran_id" TEXT NOT NULL,
    "dibuat_oleh" TEXT,
    "diperbarui_oleh" TEXT,
    "dihapus_oleh" TEXT,
    "status" VARCHAR(20),
    "dibuat_pada" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diperbarui_pada" TIMESTAMP NOT NULL,
    "dihapus_pada" TIMESTAMP,

    CONSTRAINT "siswa_kelas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "komponen_nilai" (
    "id" TEXT NOT NULL,
    "kelas_mapel_id" TEXT NOT NULL,
    "dibuat_oleh" TEXT,
    "diperbarui_oleh" TEXT,
    "dihapus_oleh" TEXT,
    "nama" VARCHAR(50) NOT NULL,
    "jenis" VARCHAR(20) NOT NULL,
    "bobot" DECIMAL(5,2) NOT NULL,
    "nilai_maksimum" DECIMAL(5,2) NOT NULL,
    "kelompok" VARCHAR(30) NOT NULL,
    "status" VARCHAR(20),
    "dibuat_pada" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diperbarui_pada" TIMESTAMP NOT NULL,

    CONSTRAINT "komponen_nilai_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nilai" (
    "id" TEXT NOT NULL,
    "pengguna_id" TEXT NOT NULL,
    "kelas_mapel_id" TEXT NOT NULL,
    "komponen_nilai_id" TEXT NOT NULL,
    "dibuat_oleh" TEXT,
    "diperbarui_oleh" TEXT,
    "dihapus_oleh" TEXT,
    "nilai" DECIMAL(5,2) NOT NULL,
    "sumber" VARCHAR(20),
    "sumber_id" TEXT,
    "catatan" TEXT,
    "dibuat_pada" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diperbarui_pada" TIMESTAMP NOT NULL,

    CONSTRAINT "nilai_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "absensi" (
    "id" TEXT NOT NULL,
    "pengguna_id" TEXT NOT NULL,
    "kelas_id" TEXT NOT NULL,
    "dibuat_oleh" TEXT,
    "diperbarui_oleh" TEXT,
    "dihapus_oleh" TEXT,
    "tanggal" DATE NOT NULL,
    "status" VARCHAR(10) NOT NULL,
    "keterangan" TEXT,
    "metode" VARCHAR(20),
    "lintang" DECIMAL(10,8),
    "bujur" DECIMAL(11,8),
    "url_foto" VARCHAR(255),
    "dibuat_pada" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diperbarui_pada" TIMESTAMP NOT NULL,

    CONSTRAINT "absensi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ujian" (
    "id" TEXT NOT NULL,
    "kelas_mapel_id" TEXT NOT NULL,
    "dibuat_oleh" TEXT,
    "diperbarui_oleh" TEXT,
    "dihapus_oleh" TEXT,
    "judul" VARCHAR(100) NOT NULL,
    "deskripsi" TEXT,
    "jenis" VARCHAR(20) NOT NULL,
    "durasi" INTEGER NOT NULL,
    "waktu_mulai" TIMESTAMP,
    "waktu_selesai" TIMESTAMP,
    "nilai_kelulusan" DECIMAL(5,2),
    "dipublikasikan" BOOLEAN NOT NULL DEFAULT false,
    "mode_ujian" VARCHAR(20),
    "penilaian_otomatis" BOOLEAN NOT NULL DEFAULT true,
    "dibuat_pada" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diperbarui_pada" TIMESTAMP NOT NULL,

    CONSTRAINT "ujian_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "soal_ujian" (
    "id" TEXT NOT NULL,
    "ujian_id" TEXT NOT NULL,
    "dibuat_oleh" TEXT,
    "diperbarui_oleh" TEXT,
    "dihapus_oleh" TEXT,
    "teks_soal" TEXT NOT NULL,
    "jenis_soal" VARCHAR(20) NOT NULL,
    "pilihan" JSONB,
    "jawaban_benar" TEXT,
    "poin" DECIMAL(5,2) NOT NULL,
    "nomor_urut" INTEGER NOT NULL,
    "dibuat_pada" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diperbarui_pada" TIMESTAMP NOT NULL,

    CONSTRAINT "soal_ujian_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "percobaan_ujian" (
    "id" TEXT NOT NULL,
    "ujian_id" TEXT NOT NULL,
    "pengguna_id" TEXT NOT NULL,
    "dibuat_oleh" TEXT,
    "diperbarui_oleh" TEXT,
    "dihapus_oleh" TEXT,
    "dimulai_pada" TIMESTAMP NOT NULL,
    "selesai_pada" TIMESTAMP,
    "nilai" DECIMAL(5,2),
    "status" VARCHAR(20),
    "dibuat_pada" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diperbarui_pada" TIMESTAMP NOT NULL,

    CONSTRAINT "percobaan_ujian_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jawaban_ujian" (
    "id" TEXT NOT NULL,
    "percobaan_ujian_id" TEXT NOT NULL,
    "soal_id" TEXT NOT NULL,
    "dibuat_oleh" TEXT,
    "diperbarui_oleh" TEXT,
    "dihapus_oleh" TEXT,
    "jawaban" TEXT,
    "nilai" DECIMAL(5,2),
    "benar" BOOLEAN,
    "dibuat_pada" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diperbarui_pada" TIMESTAMP NOT NULL,

    CONSTRAINT "jawaban_ujian_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hasil_ujian" (
    "id" TEXT NOT NULL,
    "percobaan_ujian_id" TEXT NOT NULL,
    "dibuat_oleh" TEXT,
    "diperbarui_oleh" TEXT,
    "dihapus_oleh" TEXT,
    "total_nilai" DECIMAL(5,2) NOT NULL,
    "jumlah_benar" INTEGER NOT NULL,
    "jumlah_salah" INTEGER NOT NULL,
    "jumlah_lewati" INTEGER NOT NULL,
    "detail" JSONB,
    "dibuat_pada" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diperbarui_pada" TIMESTAMP NOT NULL,

    CONSTRAINT "hasil_ujian_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tugas" (
    "id" TEXT NOT NULL,
    "kelas_mapel_id" TEXT NOT NULL,
    "dibuat_oleh" TEXT,
    "diperbarui_oleh" TEXT,
    "dihapus_oleh" TEXT,
    "judul" VARCHAR(100) NOT NULL,
    "deskripsi" TEXT,
    "batas_waktu" TIMESTAMP,
    "dibuat_pada" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diperbarui_pada" TIMESTAMP NOT NULL,

    CONSTRAINT "tugas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pengumpulan_tugas" (
    "id" TEXT NOT NULL,
    "tugas_id" TEXT NOT NULL,
    "pengguna_id" TEXT NOT NULL,
    "dibuat_oleh" TEXT,
    "diperbarui_oleh" TEXT,
    "dihapus_oleh" TEXT,
    "url_file" VARCHAR(255),
    "status" VARCHAR(20),
    "nilai" DECIMAL(5,2),
    "keterangan" TEXT,
    "dibuat_pada" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diperbarui_pada" TIMESTAMP NOT NULL,

    CONSTRAINT "pengumpulan_tugas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "materi_pembelajaran" (
    "id" TEXT NOT NULL,
    "kelas_mapel_id" TEXT NOT NULL,
    "dibuat_oleh" TEXT,
    "diperbarui_oleh" TEXT,
    "dihapus_oleh" TEXT,
    "judul" VARCHAR(100) NOT NULL,
    "deskripsi" TEXT,
    "url_file" VARCHAR(255),
    "kategori" VARCHAR(50),
    "dibuat_pada" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diperbarui_pada" TIMESTAMP NOT NULL,

    CONSTRAINT "materi_pembelajaran_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "aset" (
    "id" TEXT NOT NULL,
    "sekolah_id" TEXT NOT NULL,
    "kategori_aset_id" TEXT NOT NULL,
    "gudang_id" TEXT NOT NULL,
    "dibuat_oleh" TEXT,
    "diperbarui_oleh" TEXT,
    "dihapus_oleh" TEXT,
    "nama" VARCHAR(100) NOT NULL,
    "kode" VARCHAR(50) NOT NULL,
    "kondisi" VARCHAR(20) NOT NULL,
    "jumlah" INTEGER NOT NULL,
    "jumlah_stok" INTEGER NOT NULL,
    "stok_minimum" INTEGER NOT NULL,
    "lokasi" VARCHAR(100),
    "status" VARCHAR(20),
    "tanggal_pembelian" DATE,
    "perawatan_terakhir" DATE,
    "tanggal_rusak" DATE,
    "deskripsi_kerusakan" TEXT,
    "status_perbaikan" VARCHAR(20),
    "catatan" TEXT,
    "dibuat_pada" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diperbarui_pada" TIMESTAMP NOT NULL,
    "dihapus_pada" TIMESTAMP,

    CONSTRAINT "aset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gudang" (
    "id" TEXT NOT NULL,
    "sekolah_id" TEXT NOT NULL,
    "dibuat_oleh" TEXT,
    "diperbarui_oleh" TEXT,
    "dihapus_oleh" TEXT,
    "nama" VARCHAR(100) NOT NULL,
    "lokasi" VARCHAR(255),
    "status" VARCHAR(20),
    "dibuat_pada" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diperbarui_pada" TIMESTAMP NOT NULL,
    "dihapus_pada" TIMESTAMP,

    CONSTRAINT "gudang_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kategori_aset" (
    "id" TEXT NOT NULL,
    "sekolah_id" TEXT NOT NULL,
    "dibuat_oleh" TEXT,
    "diperbarui_oleh" TEXT,
    "dihapus_oleh" TEXT,
    "nama" VARCHAR(50) NOT NULL,
    "status" VARCHAR(20),
    "dibuat_pada" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diperbarui_pada" TIMESTAMP NOT NULL,
    "dihapus_pada" TIMESTAMP,

    CONSTRAINT "kategori_aset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "laporan_kerusakan" (
    "id" TEXT NOT NULL,
    "sekolah_id" TEXT NOT NULL,
    "aset_id" TEXT NOT NULL,
    "dilaporkan_oleh" TEXT NOT NULL,
    "dibuat_oleh" TEXT,
    "diperbarui_oleh" TEXT,
    "dihapus_oleh" TEXT,
    "tanggal_laporan" TIMESTAMP NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "status" VARCHAR(20),
    "catatan_perbaikan" TEXT,
    "dibuat_pada" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diperbarui_pada" TIMESTAMP NOT NULL,
    "dihapus_pada" TIMESTAMP,

    CONSTRAINT "laporan_kerusakan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "halaman_cms" (
    "id" TEXT NOT NULL,
    "sekolah_id" TEXT NOT NULL,
    "dibuat_oleh" TEXT,
    "diperbarui_oleh" TEXT,
    "dihapus_oleh" TEXT,
    "judul" VARCHAR(100) NOT NULL,
    "slug" VARCHAR(100) NOT NULL,
    "konten" TEXT,
    "status" VARCHAR(20),
    "dibuat_pada" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diperbarui_pada" TIMESTAMP NOT NULL,
    "dihapus_pada" TIMESTAMP,

    CONSTRAINT "halaman_cms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "artikel_cms" (
    "id" TEXT NOT NULL,
    "sekolah_id" TEXT NOT NULL,
    "kategori_artikel_id" TEXT,
    "dibuat_oleh" TEXT,
    "diperbarui_oleh" TEXT,
    "dihapus_oleh" TEXT,
    "judul" VARCHAR(100) NOT NULL,
    "slug" VARCHAR(100) NOT NULL,
    "konten" TEXT,
    "ringkasan" TEXT,
    "gambar_utama" VARCHAR(255),
    "status" VARCHAR(20),
    "dipublikasikan_pada" TIMESTAMP,
    "dibuat_pada" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diperbarui_pada" TIMESTAMP NOT NULL,
    "dihapus_pada" TIMESTAMP,

    CONSTRAINT "artikel_cms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kategori_artikel" (
    "id" TEXT NOT NULL,
    "sekolah_id" TEXT NOT NULL,
    "dibuat_oleh" TEXT,
    "diperbarui_oleh" TEXT,
    "dihapus_oleh" TEXT,
    "nama" VARCHAR(50) NOT NULL,
    "slug" VARCHAR(50) NOT NULL,
    "status" VARCHAR(20),
    "dibuat_pada" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diperbarui_pada" TIMESTAMP NOT NULL,
    "dihapus_pada" TIMESTAMP,

    CONSTRAINT "kategori_artikel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jalur_ppdb" (
    "id" TEXT NOT NULL,
    "sekolah_id" TEXT NOT NULL,
    "dibuat_oleh" TEXT,
    "diperbarui_oleh" TEXT,
    "dihapus_oleh" TEXT,
    "nama" VARCHAR(50) NOT NULL,
    "deskripsi" TEXT,
    "kuota" INTEGER NOT NULL,
    "tanggal_mulai" DATE,
    "tanggal_selesai" DATE,
    "status" VARCHAR(20),
    "dibuat_pada" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diperbarui_pada" TIMESTAMP NOT NULL,
    "dihapus_pada" TIMESTAMP,

    CONSTRAINT "jalur_ppdb_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pendaftaran_ppdb" (
    "id" TEXT NOT NULL,
    "sekolah_id" TEXT NOT NULL,
    "jalur_ppdb_id" TEXT NOT NULL,
    "dibuat_oleh" TEXT,
    "diperbarui_oleh" TEXT,
    "dihapus_oleh" TEXT,
    "nomor_pendaftaran" VARCHAR(20) NOT NULL,
    "nama_lengkap" VARCHAR(100) NOT NULL,
    "nisn" VARCHAR(20) NOT NULL,
    "tempat_lahir" VARCHAR(50) NOT NULL,
    "tanggal_lahir" DATE NOT NULL,
    "jenis_kelamin" VARCHAR(10) NOT NULL,
    "alamat" TEXT NOT NULL,
    "telepon" VARCHAR(20),
    "email" VARCHAR(100),
    "nama_ayah" VARCHAR(100),
    "nama_ibu" VARCHAR(100),
    "asal_sekolah" VARCHAR(100),
    "nilai_rapor" DECIMAL(5,2),
    "status" VARCHAR(20),
    "kelas_id" TEXT,
    "dikonversi_ke_pengguna_id" TEXT,
    "dikonversi_pada" TIMESTAMP,
    "dibuat_pada" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diperbarui_pada" TIMESTAMP NOT NULL,
    "dihapus_pada" TIMESTAMP,

    CONSTRAINT "pendaftaran_ppdb_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "berkas_ppdb" (
    "id" TEXT NOT NULL,
    "pendaftaran_ppdb_id" TEXT NOT NULL,
    "dibuat_oleh" TEXT,
    "diperbarui_oleh" TEXT,
    "dihapus_oleh" TEXT,
    "nama_berkas" VARCHAR(50) NOT NULL,
    "url_file" VARCHAR(255) NOT NULL,
    "status" VARCHAR(20),
    "keterangan" TEXT,
    "dibuat_pada" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diperbarui_pada" TIMESTAMP NOT NULL,
    "dihapus_pada" TIMESTAMP,

    CONSTRAINT "berkas_ppdb_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hasil_seleksi_ppdb" (
    "id" TEXT NOT NULL,
    "pendaftaran_ppdb_id" TEXT NOT NULL,
    "dibuat_oleh" TEXT,
    "diperbarui_oleh" TEXT,
    "dihapus_oleh" TEXT,
    "nilai_tes" DECIMAL(5,2),
    "peringkat" INTEGER,
    "status_kelulusan" VARCHAR(20),
    "catatan" TEXT,
    "dibuat_pada" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diperbarui_pada" TIMESTAMP NOT NULL,
    "dihapus_pada" TIMESTAMP,

    CONSTRAINT "hasil_seleksi_ppdb_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pengguna_nama_pengguna_key" ON "pengguna"("nama_pengguna");

-- CreateIndex
CREATE UNIQUE INDEX "pengguna_email_key" ON "pengguna"("email");

-- CreateIndex
CREATE UNIQUE INDEX "peran_nama_key" ON "peran"("nama");

-- CreateIndex
CREATE UNIQUE INDEX "izin_nama_key" ON "izin"("nama");

-- CreateIndex
CREATE UNIQUE INDEX "sekolah_subdomain_key" ON "sekolah"("subdomain");

-- CreateIndex
CREATE UNIQUE INDEX "sekolah_kode_key" ON "sekolah"("kode");

-- CreateIndex
CREATE UNIQUE INDEX "modul_kode_key" ON "modul"("kode");

-- CreateIndex
CREATE UNIQUE INDEX "mata_pelajaran_kode_key" ON "mata_pelajaran"("kode");

-- CreateIndex
CREATE UNIQUE INDEX "hasil_ujian_percobaan_ujian_id_key" ON "hasil_ujian"("percobaan_ujian_id");

-- CreateIndex
CREATE UNIQUE INDEX "aset_kode_key" ON "aset"("kode");

-- CreateIndex
CREATE UNIQUE INDEX "halaman_cms_slug_key" ON "halaman_cms"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "artikel_cms_slug_key" ON "artikel_cms"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "kategori_artikel_slug_key" ON "kategori_artikel"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "pendaftaran_ppdb_nomor_pendaftaran_key" ON "pendaftaran_ppdb"("nomor_pendaftaran");

-- CreateIndex
CREATE UNIQUE INDEX "pendaftaran_ppdb_nisn_key" ON "pendaftaran_ppdb"("nisn");

-- CreateIndex
CREATE UNIQUE INDEX "hasil_seleksi_ppdb_pendaftaran_ppdb_id_key" ON "hasil_seleksi_ppdb"("pendaftaran_ppdb_id");

-- AddForeignKey
ALTER TABLE "pengguna" ADD CONSTRAINT "pengguna_sekolah_id_fkey" FOREIGN KEY ("sekolah_id") REFERENCES "sekolah"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pengguna" ADD CONSTRAINT "pengguna_peran_id_fkey" FOREIGN KEY ("peran_id") REFERENCES "peran"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "peran_izin" ADD CONSTRAINT "peran_izin_peran_id_fkey" FOREIGN KEY ("peran_id") REFERENCES "peran"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "peran_izin" ADD CONSTRAINT "peran_izin_izin_id_fkey" FOREIGN KEY ("izin_id") REFERENCES "izin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sekolah" ADD CONSTRAINT "sekolah_yayasan_id_fkey" FOREIGN KEY ("yayasan_id") REFERENCES "yayasan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paket_modul" ADD CONSTRAINT "paket_modul_paket_id_fkey" FOREIGN KEY ("paket_id") REFERENCES "paket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paket_modul" ADD CONSTRAINT "paket_modul_modul_id_fkey" FOREIGN KEY ("modul_id") REFERENCES "modul"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sekolah_modul" ADD CONSTRAINT "sekolah_modul_sekolah_id_fkey" FOREIGN KEY ("sekolah_id") REFERENCES "sekolah"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sekolah_modul" ADD CONSTRAINT "sekolah_modul_modul_id_fkey" FOREIGN KEY ("modul_id") REFERENCES "modul"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "langganan_sekolah" ADD CONSTRAINT "langganan_sekolah_sekolah_id_fkey" FOREIGN KEY ("sekolah_id") REFERENCES "sekolah"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "langganan_sekolah" ADD CONSTRAINT "langganan_sekolah_paket_id_fkey" FOREIGN KEY ("paket_id") REFERENCES "paket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "riwayat_pembayaran" ADD CONSTRAINT "riwayat_pembayaran_langganan_sekolah_id_fkey" FOREIGN KEY ("langganan_sekolah_id") REFERENCES "langganan_sekolah"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "riwayat_pembayaran" ADD CONSTRAINT "riwayat_pembayaran_sekolah_id_fkey" FOREIGN KEY ("sekolah_id") REFERENCES "sekolah"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifikasi" ADD CONSTRAINT "notifikasi_pengguna_id_fkey" FOREIGN KEY ("pengguna_id") REFERENCES "pengguna"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifikasi" ADD CONSTRAINT "notifikasi_pengirim_id_fkey" FOREIGN KEY ("pengirim_id") REFERENCES "pengguna"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tahun_ajaran" ADD CONSTRAINT "tahun_ajaran_sekolah_id_fkey" FOREIGN KEY ("sekolah_id") REFERENCES "sekolah"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kelas" ADD CONSTRAINT "kelas_sekolah_id_fkey" FOREIGN KEY ("sekolah_id") REFERENCES "sekolah"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kelas" ADD CONSTRAINT "kelas_tahun_ajaran_id_fkey" FOREIGN KEY ("tahun_ajaran_id") REFERENCES "tahun_ajaran"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kelas" ADD CONSTRAINT "kelas_wali_kelas_id_fkey" FOREIGN KEY ("wali_kelas_id") REFERENCES "pengguna"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mata_pelajaran" ADD CONSTRAINT "mata_pelajaran_sekolah_id_fkey" FOREIGN KEY ("sekolah_id") REFERENCES "sekolah"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kelas_mapel" ADD CONSTRAINT "kelas_mapel_kelas_id_fkey" FOREIGN KEY ("kelas_id") REFERENCES "kelas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kelas_mapel" ADD CONSTRAINT "kelas_mapel_mata_pelajaran_id_fkey" FOREIGN KEY ("mata_pelajaran_id") REFERENCES "mata_pelajaran"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kelas_mapel" ADD CONSTRAINT "kelas_mapel_guru_pengajar_id_fkey" FOREIGN KEY ("guru_pengajar_id") REFERENCES "pengguna"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "siswa_kelas" ADD CONSTRAINT "siswa_kelas_kelas_id_fkey" FOREIGN KEY ("kelas_id") REFERENCES "kelas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "siswa_kelas" ADD CONSTRAINT "siswa_kelas_pengguna_id_fkey" FOREIGN KEY ("pengguna_id") REFERENCES "pengguna"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "siswa_kelas" ADD CONSTRAINT "siswa_kelas_tahun_ajaran_id_fkey" FOREIGN KEY ("tahun_ajaran_id") REFERENCES "tahun_ajaran"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "komponen_nilai" ADD CONSTRAINT "komponen_nilai_kelas_mapel_id_fkey" FOREIGN KEY ("kelas_mapel_id") REFERENCES "kelas_mapel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nilai" ADD CONSTRAINT "nilai_pengguna_id_fkey" FOREIGN KEY ("pengguna_id") REFERENCES "pengguna"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nilai" ADD CONSTRAINT "nilai_kelas_mapel_id_fkey" FOREIGN KEY ("kelas_mapel_id") REFERENCES "kelas_mapel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nilai" ADD CONSTRAINT "nilai_komponen_nilai_id_fkey" FOREIGN KEY ("komponen_nilai_id") REFERENCES "komponen_nilai"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "absensi" ADD CONSTRAINT "absensi_pengguna_id_fkey" FOREIGN KEY ("pengguna_id") REFERENCES "pengguna"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "absensi" ADD CONSTRAINT "absensi_kelas_id_fkey" FOREIGN KEY ("kelas_id") REFERENCES "kelas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ujian" ADD CONSTRAINT "ujian_kelas_mapel_id_fkey" FOREIGN KEY ("kelas_mapel_id") REFERENCES "kelas_mapel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "soal_ujian" ADD CONSTRAINT "soal_ujian_ujian_id_fkey" FOREIGN KEY ("ujian_id") REFERENCES "ujian"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "percobaan_ujian" ADD CONSTRAINT "percobaan_ujian_ujian_id_fkey" FOREIGN KEY ("ujian_id") REFERENCES "ujian"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "percobaan_ujian" ADD CONSTRAINT "percobaan_ujian_pengguna_id_fkey" FOREIGN KEY ("pengguna_id") REFERENCES "pengguna"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jawaban_ujian" ADD CONSTRAINT "jawaban_ujian_percobaan_ujian_id_fkey" FOREIGN KEY ("percobaan_ujian_id") REFERENCES "percobaan_ujian"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hasil_ujian" ADD CONSTRAINT "hasil_ujian_percobaan_ujian_id_fkey" FOREIGN KEY ("percobaan_ujian_id") REFERENCES "percobaan_ujian"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tugas" ADD CONSTRAINT "tugas_kelas_mapel_id_fkey" FOREIGN KEY ("kelas_mapel_id") REFERENCES "kelas_mapel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pengumpulan_tugas" ADD CONSTRAINT "pengumpulan_tugas_pengguna_id_fkey" FOREIGN KEY ("pengguna_id") REFERENCES "pengguna"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "materi_pembelajaran" ADD CONSTRAINT "materi_pembelajaran_kelas_mapel_id_fkey" FOREIGN KEY ("kelas_mapel_id") REFERENCES "kelas_mapel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "aset" ADD CONSTRAINT "aset_sekolah_id_fkey" FOREIGN KEY ("sekolah_id") REFERENCES "sekolah"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "halaman_cms" ADD CONSTRAINT "halaman_cms_sekolah_id_fkey" FOREIGN KEY ("sekolah_id") REFERENCES "sekolah"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "artikel_cms" ADD CONSTRAINT "artikel_cms_sekolah_id_fkey" FOREIGN KEY ("sekolah_id") REFERENCES "sekolah"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "artikel_cms" ADD CONSTRAINT "artikel_cms_kategori_artikel_id_fkey" FOREIGN KEY ("kategori_artikel_id") REFERENCES "kategori_artikel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jalur_ppdb" ADD CONSTRAINT "jalur_ppdb_sekolah_id_fkey" FOREIGN KEY ("sekolah_id") REFERENCES "sekolah"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pendaftaran_ppdb" ADD CONSTRAINT "pendaftaran_ppdb_sekolah_id_fkey" FOREIGN KEY ("sekolah_id") REFERENCES "sekolah"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pendaftaran_ppdb" ADD CONSTRAINT "pendaftaran_ppdb_jalur_ppdb_id_fkey" FOREIGN KEY ("jalur_ppdb_id") REFERENCES "jalur_ppdb"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pendaftaran_ppdb" ADD CONSTRAINT "pendaftaran_ppdb_dikonversi_ke_pengguna_id_fkey" FOREIGN KEY ("dikonversi_ke_pengguna_id") REFERENCES "pengguna"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "berkas_ppdb" ADD CONSTRAINT "berkas_ppdb_pendaftaran_ppdb_id_fkey" FOREIGN KEY ("pendaftaran_ppdb_id") REFERENCES "pendaftaran_ppdb"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hasil_seleksi_ppdb" ADD CONSTRAINT "hasil_seleksi_ppdb_pendaftaran_ppdb_id_fkey" FOREIGN KEY ("pendaftaran_ppdb_id") REFERENCES "pendaftaran_ppdb"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

```

## prisma/migrations/migration_lock.toml

```toml
# Please do not edit this file manually
# It should be added in your version-control system (e.g., Git)
provider = "postgresql"

```

## prisma/schema.prisma

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
}

// ==========================================
// 1. SHARED TABLES (Public Schema)
// ==========================================

model Pengguna {
  id             String    @id @default(uuid())
  sekolahId      String?   @map("sekolah_id")
  yayasanId      String?   @map("yayasan_id")
  peranId        String?   @map("peran_id")
  dibuatOleh     String?   @map("dibuat_oleh")
  diperbaruiOleh String?   @map("diperbarui_oleh")
  dihapusOleh    String?   @map("dihapus_oleh")
  namaPengguna   String    @unique @map("nama_pengguna") @db.VarChar(50)
  email          String    @unique @db.VarChar(100)
  kataSandi      String    @map("kata_sandi") @db.VarChar(255)
  namaLengkap    String    @map("nama_lengkap") @db.VarChar(100)
  avatar         String?   @db.VarChar(255)
  nipd           String?   @db.VarChar(20)
  nip            String?   @db.VarChar(20)
  nuptk          String?   @db.VarChar(20)
  nisn           String?   @unique @db.VarChar(20)
  nis            String?   @db.VarChar(20)
  jenisKelamin   String?   @map("jenis_kelamin") @db.VarChar(10)
  tempatLahir    String?   @map("tempat_lahir") @db.VarChar(50)
  tanggalLahir   DateTime? @map("tanggal_lahir") @db.Date
  alamat         String?   @db.Text
  noTelepon      String?   @map("no_telepon") @db.VarChar(20)
  status         String?   @db.VarChar(20)
  terakhirLogin  DateTime? @map("terakhir_login") @db.Timestamp()
  kodeOtp        String?   @map("kode_otp") @db.VarChar(10)
  otpTimeout     DateTime? @map("otp_timeout") @db.Timestamp()
  dibuatPada     DateTime  @default(now()) @map("dibuat_pada") @db.Timestamp()
  diperbaruiPada DateTime  @updatedAt @map("diperbarui_pada") @db.Timestamp()
  dihapusPada    DateTime? @map("dihapus_pada") @db.Timestamp()

  sekolah Sekolah? @relation(fields: [sekolahId], references: [id])
  yayasan Yayasan? @relation(fields: [yayasanId], references: [id])
  peran   Peran?   @relation(fields: [peranId], references: [id])

  kelasWali             Kelas[]            @relation("WaliKelas")
  kelasMapelDiajar      KelasMapel[]       @relation("GuruPengajar")
  nilaiSiswa            Nilai[]
  absensiSiswa          Absensi[]
  percobaanUjianSiswa   PercobaanUjian[]
  pengumpulanTugasSiswa PengumpulanTugas[]
  pendaftaranPpdb       PendaftaranPpdb[]
  kelasSiswa            AnggotaKelas[]     @relation("SiswaKelas")
  notifikasiDiterima    Notifikasi[]       @relation("PenerimaNotifikasi")
  notifikasiDikirim     Notifikasi[]       @relation("PengirimNotifikasi")

  // Relasi LMS
  kuisDibuat    Kuis[]          @relation("PembuatKuis")
  sesiKuisSiswa SesiKuisSiswa[]

  @@map("pengguna")
}

model Peran {
  id             String    @id @default(uuid())
  dibuatOleh     String?   @map("dibuat_oleh")
  diperbaruiOleh String?   @map("diperbarui_oleh")
  dihapusOleh    String?   @map("dihapus_oleh")
  nama           String    @unique @db.VarChar(50)
  namaTampilan   String    @map("nama_tampilan") @db.VarChar(100)
  deskripsi      String?   @db.Text
  status         String?   @db.VarChar(20)
  dibuatPada     DateTime  @default(now()) @map("dibuat_pada") @db.Timestamp()
  diperbaruiPada DateTime  @updatedAt @map("diperbarui_pada") @db.Timestamp()
  dihapusPada    DateTime? @map("dihapus_pada") @db.Timestamp()

  pengguna  Pengguna[]
  peranIzin PeranIzin[]

  @@map("peran")
}

model Izin {
  id             String    @id @default(uuid())
  dibuatOleh     String?   @map("dibuat_oleh")
  diperbaruiOleh String?   @map("diperbarui_oleh")
  dihapusOleh    String?   @map("dihapus_oleh")
  nama           String    @unique @db.VarChar(100)
  modul          String    @db.VarChar(50)
  aksi           String    @db.VarChar(50)
  status         String?   @db.VarChar(20)
  dibuatPada     DateTime  @default(now()) @map("dibuat_pada") @db.Timestamp()
  diperbaruiPada DateTime  @updatedAt @map("diperbarui_pada") @db.Timestamp()
  dihapusPada    DateTime? @map("dihapus_pada") @db.Timestamp()

  peranIzin PeranIzin[]

  @@map("izin")
}

model PeranIzin {
  id             String    @id @default(uuid())
  dibuatOleh     String?   @map("dibuat_oleh")
  diperbaruiOleh String?   @map("diperbarui_oleh")
  dihapusOleh    String?   @map("dihapus_oleh")
  peranId        String    @map("peran_id")
  izinId         String    @map("izin_id")
  dibuatPada     DateTime  @default(now()) @map("dibuat_pada") @db.Timestamp()
  diperbaruiPada DateTime  @updatedAt @map("diperbarui_pada") @db.Timestamp()
  dihapusPada    DateTime? @map("dihapus_pada") @db.Timestamp()

  peran Peran @relation(fields: [peranId], references: [id])
  izin  Izin  @relation(fields: [izinId], references: [id])

  @@map("peran_izin")
}

model Sekolah {
  id               String  @id @default(uuid())
  yayasanId        String? @map("yayasan_id")
  langgananAktifId String? @map("langganan_aktif_id")
  dibuatOleh       String? @map("dibuat_oleh")
  diperbaruiOleh   String? @map("diperbarui_oleh")
  dihapusOleh      String? @map("dihapus_oleh")
  nama             String  @db.VarChar(100)
  subdomain        String  @unique @db.VarChar(50)
  kode             String  @unique @db.VarChar(20)

  jenjang         String    @db.VarChar(20)

  alamat         String?   @db.Text
  telepon        String?   @db.VarChar(20)
  email          String?   @db.VarChar(100)
  logo           String?   @db.VarChar(255)
  status         String?   @db.VarChar(20)
  konfigurasi    Json?
  dibuatPada     DateTime  @default(now()) @map("dibuat_pada") @db.Timestamp()
  diperbaruiPada DateTime  @updatedAt @map("diperbarui_pada") @db.Timestamp()
  dihapusPada    DateTime? @map("dihapus_pada") @db.Timestamp()

  yayasan           Yayasan?            @relation(fields: [yayasanId], references: [id])
  pengguna          Pengguna[]
  tahunAjaran       TahunAjaran[]
  kelas             Kelas[]
  mataPelajaran     MataPelajaran[]
  sekolahModul      SekolahModul[]
  aset              Aset[]
  halamanCms        HalamanCms[]
  artikelCms        ArtikelCms[]
  jalurPpdb         JalurPpdb[]
  pendaftaranPpdb   PendaftaranPpdb[]
  langgananSekolah  LanggananSekolah[]
  riwayatPembayaran RiwayatPembayaran[]

  // Relasi LMS
  kuis Kuis[]

  @@map("sekolah")
}

model Yayasan {
  id             String    @id @default(uuid())
  dibuatOleh     String?   @map("dibuat_oleh")
  diperbaruiOleh String?   @map("diperbarui_oleh")
  dihapusOleh    String?   @map("dihapus_oleh")
  nama           String    @db.VarChar(100)
  alamat         String?   @db.Text
  telepon        String?   @db.VarChar(20)
  email          String?   @db.VarChar(100)
  npyp           String?   @unique @db.VarChar(50)
  status         String?   @db.VarChar(20)
  dibuatPada     DateTime  @default(now()) @map("dibuat_pada") @db.Timestamp()
  diperbaruiPada DateTime  @updatedAt @map("diperbarui_pada") @db.Timestamp()
  dihapusPada    DateTime? @map("dihapus_pada") @db.Timestamp()

  sekolah  Sekolah[]
  pengguna Pengguna[]

  @@map("yayasan")
}

model Paket {
  id             String    @id @default(uuid())
  dibuatOleh     String?   @map("dibuat_oleh")
  diperbaruiOleh String?   @map("diperbarui_oleh")
  dihapusOleh    String?   @map("dihapus_oleh")
  nama           String    @db.VarChar(100)
  deskripsi      String?   @db.Text
  harga          Decimal   @db.Decimal(15, 2)
  durasi         Int
  status         String?   @db.VarChar(20)
  dibuatPada     DateTime  @default(now()) @map("dibuat_pada") @db.Timestamp()
  diperbaruiPada DateTime  @updatedAt @map("diperbarui_pada") @db.Timestamp()
  dihapusPada    DateTime? @map("dihapus_pada") @db.Timestamp()

  paketModul       PaketModul[]
  langgananSekolah LanggananSekolah[]

  @@map("paket")
}

model Modul {
  id             String    @id @default(uuid())
  dibuatOleh     String?   @map("dibuat_oleh")
  diperbaruiOleh String?   @map("diperbarui_oleh")
  dihapusOleh    String?   @map("dihapus_oleh")
  kode           String    @unique @db.VarChar(20)
  nama           String    @db.VarChar(100)
  deskripsi      String?   @db.Text
  ikon           String?   @db.VarChar(50)
  sistem         Boolean?
  status         String?   @db.VarChar(20)
  dibuatPada     DateTime  @default(now()) @map("dibuat_pada") @db.Timestamp()
  diperbaruiPada DateTime  @updatedAt @map("diperbarui_pada") @db.Timestamp()
  dihapusPada    DateTime? @map("dihapus_pada") @db.Timestamp()

  paketModul   PaketModul[]
  sekolahModul SekolahModul[]

  @@map("modul")
}

model PaketModul {
  id             String    @id @default(uuid())
  paketId        String    @map("paket_id")
  modulId        String    @map("modul_id")
  dibuatOleh     String?   @map("dibuat_oleh")
  diperbaruiOleh String?   @map("diperbarui_oleh")
  dihapusOleh    String?   @map("dihapus_oleh")
  status         String?   @db.VarChar(20)
  dibuatPada     DateTime  @default(now()) @map("dibuat_pada") @db.Timestamp()
  diperbaruiPada DateTime  @updatedAt @map("diperbarui_pada") @db.Timestamp()
  dihapusPada    DateTime? @map("dihapus_pada") @db.Timestamp()

  paket Paket @relation(fields: [paketId], references: [id])
  modul Modul @relation(fields: [modulId], references: [id])

  @@map("paket_modul")
}

model SekolahModul {
  id              String    @id @default(uuid())
  sekolahId       String    @map("sekolah_id")
  modulId         String    @map("modul_id")
  dibuatOleh      String?   @map("dibuat_oleh")
  diperbaruiOleh  String?   @map("diperbarui_oleh")
  dihapusOleh     String?   @map("dihapus_oleh")
  status          String?   @db.VarChar(20)
  diaktifkanPada  DateTime? @map("diaktifkan_pada") @db.Timestamp()
  kedaluwarsaPada DateTime? @map("kedaluwarsa_pada") @db.Timestamp()
  dibuatPada      DateTime  @default(now()) @map("dibuat_pada") @db.Timestamp()
  diperbaruiPada  DateTime  @updatedAt @map("diperbarui_pada") @db.Timestamp()
  dihapusPada     DateTime? @map("dihapus_pada") @db.Timestamp()

  sekolah Sekolah @relation(fields: [sekolahId], references: [id])
  modul   Modul   @relation(fields: [modulId], references: [id])

  @@map("sekolah_modul")
}

model LanggananSekolah {
  id                    String    @id @default(uuid())
  sekolahId             String    @map("sekolah_id")
  paketId               String    @map("paket_id")
  dibuatOleh            String?   @map("dibuat_oleh")
  diperbaruiOleh        String?   @map("diperbarui_oleh")
  dihapusOleh           String?   @map("dihapus_oleh")
  statusPembayaran      String?   @map("status_pembayaran") @db.VarChar(20)
  statusLangganan       String?   @map("status_langganan") @db.VarChar(20)
  tanggalMulai          DateTime? @map("tanggal_mulai") @db.Timestamp()
  tanggalBerakhir       DateTime? @map("tanggal_berakhir") @db.Timestamp()
  hargaSaatBerlangganan Decimal?  @map("harga_saat_berlangganan") @db.Decimal(15, 2)
  siklusPenagihan       String?   @map("siklus_penagihan") @db.VarChar(20)
  fiturAktif            Json?     @map("fitur_aktif")
  midtransOrderId       String?   @map("midtrans_order_id") @db.VarChar(100)
  midtransPaymentLink   String?   @map("midtrans_payment_link") @db.VarChar(255)
  dibuatPada            DateTime  @default(now()) @map("dibuat_pada") @db.Timestamp()
  diperbaruiPada        DateTime  @updatedAt @map("diperbarui_pada") @db.Timestamp()

  sekolah           Sekolah?            @relation(fields: [sekolahId], references: [id])
  paket             Paket               @relation(fields: [paketId], references: [id])
  riwayatPembayaran RiwayatPembayaran[]

  @@map("langganan_sekolah")
}

model RiwayatPembayaran {
  id                    String   @id @default(uuid())
  langgananSekolahId    String   @map("langganan_sekolah_id")
  sekolahId             String   @map("sekolah_id")
  dibuatOleh            String?  @map("dibuat_oleh")
  diperbaruiOleh        String?  @map("diperbarui_oleh")
  dihapusOleh           String?  @map("dihapus_oleh")
  jumlah                Decimal? @db.Decimal(15, 2)
  metode                String?  @db.VarChar(50)
  status                String?  @db.VarChar(20)
  midtransTransactionId String?  @map("midtrans_transaction_id") @db.VarChar(100)
  midtransOrderId       String?  @map("midtrans_order_id") @db.VarChar(100)
  webhookRawPayload     Json?    @map("webhook_raw_payload")
  dibuatPada            DateTime @default(now()) @map("dibuat_pada") @db.Timestamp()

  langgananSekolah LanggananSekolah @relation(fields: [langgananSekolahId], references: [id])
  sekolah          Sekolah?         @relation(fields: [sekolahId], references: [id])

  @@map("riwayat_pembayaran")
}

model Notifikasi {
  id           String    @id @default(uuid())
  penggunaId   String    @map("pengguna_id")
  pengirimId   String?   @map("pengirim_id")
  judul        String    @db.VarChar(100)
  isi          String    @db.Text
  tipe         String?   @db.VarChar(20)
  kategori     String?   @db.VarChar(30)
  targetUrl    String?   @map("target_url") @db.VarChar(255)
  dibaca       Boolean   @default(false)
  dibacaPada   DateTime? @map("dibaca_pada") @db.Timestamp()
  dikirimEmail Boolean   @default(false) @map("dikirim_email")
  dibuatPada   DateTime  @default(now()) @map("dibuat_pada") @db.Timestamp()

  pengguna Pengguna  @relation("PenerimaNotifikasi", fields: [penggunaId], references: [id])
  pengirim Pengguna? @relation("PengirimNotifikasi", fields: [pengirimId], references: [id])

  @@map("notifikasi")
}

// ==========================================
// 2. TENANT TABLES (Per Sekolah)
// ==========================================

model TahunAjaran {
  id             String    @id @default(uuid())
  nama           String    @db.VarChar(50) // Contoh: "2026/2027"
  semester       String    @db.VarChar(20) // "Ganjil" atau "Genap"
  status         String    @default("tidak_aktif") @db.VarChar(20) // "aktif" / "tidak_aktif"
  sekolahId      String    @map("sekolah_id")
  sekolah        Sekolah   @relation(fields: [sekolahId], references: [id])
  kelas          Kelas[]
  dibuatPada     DateTime  @default(now()) @map("dibuat_pada")
  diperbaruiPada DateTime  @updatedAt @map("diperbarui_pada")
  dihapusPada    DateTime? @map("dihapus_pada")

  @@map("tahun_ajaran")
}

model Kelas {
  id             String         @id @default(uuid())
  nama           String         @db.VarChar(50) // Contoh: "X IPA 1"
  tingkat        Int
  sekolahId      String         @map("sekolah_id")
  sekolah        Sekolah        @relation(fields: [sekolahId], references: [id])
  waliKelasId    String?        @map("wali_kelas_id")
  waliKelas      Pengguna?      @relation("WaliKelas", fields: [waliKelasId], references: [id])
  tahunAjaranId  String         @map("tahun_ajaran_id")
  tahunAjaran    TahunAjaran    @relation(fields: [tahunAjaranId], references: [id])
  anggota        AnggotaKelas[]
  dibuatPada     DateTime       @default(now()) @map("dibuat_pada")
  diperbaruiPada DateTime       @updatedAt @map("diperbarui_pada")
  dihapusPada    DateTime?      @map("dihapus_pada")

  kelasMapel KelasMapel[]
  absensi    Absensi[]

  @@map("kelas")
}

model MataPelajaran {
  id             String    @id @default(uuid())
  sekolahId      String    @map("sekolah_id")
  dibuatOleh     String?   @map("dibuat_oleh")
  diperbaruiOleh String?   @map("diperbarui_oleh")
  dihapusOleh    String?   @map("dihapus_oleh")
  nama           String    @db.VarChar(100)
  kode           String    @unique @db.VarChar(20)
  status         String?   @db.VarChar(20)
  dibuatPada     DateTime  @default(now()) @map("dibuat_pada") @db.Timestamp()
  diperbaruiPada DateTime  @updatedAt @map("diperbarui_pada") @db.Timestamp()
  dihapusPada    DateTime? @map("dihapus_pada") @db.Timestamp()

  sekolah    Sekolah      @relation(fields: [sekolahId], references: [id])
  kelasMapel KelasMapel[]

  @@map("mata_pelajaran")
}

model KelasMapel {
  id              String   @id @default(uuid())
  kelasId         String   @map("kelas_id")
  mataPelajaranId String   @map("mata_pelajaran_id")
  guruPengajarId  String   @map("guru_pengajar_id")
  dibuatOleh      String?  @map("dibuat_oleh")
  diperbaruiOleh  String?  @map("diperbarui_oleh")
  dihapusOleh     String?  @map("dihapus_oleh")
  status          String?  @db.VarChar(20)
  dibuatPada      DateTime @default(now()) @map("dibuat_pada") @db.Timestamp()
  diperbaruiPada  DateTime @updatedAt @map("diperbarui_pada") @db.Timestamp()

  kelas         Kelas         @relation(fields: [kelasId], references: [id])
  mataPelajaran MataPelajaran @relation(fields: [mataPelajaranId], references: [id])
  guruPengajar  Pengguna      @relation("GuruPengajar", fields: [guruPengajarId], references: [id])

  komponenNilai      KomponenNilai[]
  nilai              Nilai[]
  ujian              Ujian[]
  tugas              Tugas[]
  materiPembelajaran MateriPembelajaran[]

  @@map("kelas_mapel")
}

model AnggotaKelas {
  id         String   @id @default(uuid())
  kelasId    String   @map("kelas_id")
  kelas      Kelas    @relation(fields: [kelasId], references: [id])
  siswaId    String   @map("siswa_id")
  siswa      Pengguna @relation("SiswaKelas", fields: [siswaId], references: [id])
  dibuatPada DateTime @default(now()) @map("dibuat_pada")

  @@unique([kelasId, siswaId])
  @@map("anggota_kelas")
}

model KomponenNilai {
  id             String   @id @default(uuid())
  kelasMapelId   String   @map("kelas_mapel_id")
  dibuatOleh     String?  @map("dibuat_oleh")
  diperbaruiOleh String?  @map("diperbarui_oleh")
  dihapusOleh    String?  @map("dihapus_oleh")
  nama           String   @db.VarChar(50)
  jenis          String   @db.VarChar(20)
  bobot          Decimal  @db.Decimal(5, 2)
  nilaiMaksimum  Decimal  @map("nilai_maksimum") @db.Decimal(5, 2)
  kelompok       String   @db.VarChar(30)
  status         String?  @db.VarChar(20)
  dibuatPada     DateTime @default(now()) @map("dibuat_pada") @db.Timestamp()
  diperbaruiPada DateTime @updatedAt @map("diperbarui_pada") @db.Timestamp()

  kelasMapel KelasMapel @relation(fields: [kelasMapelId], references: [id])
  nilai      Nilai[]

  @@map("komponen_nilai")
}

model Nilai {
  id              String   @id @default(uuid())
  penggunaId      String   @map("pengguna_id")
  kelasMapelId    String   @map("kelas_mapel_id")
  komponenNilaiId String   @map("komponen_nilai_id")
  dibuatOleh      String?  @map("dibuat_oleh")
  diperbaruiOleh  String?  @map("diperbarui_oleh")
  dihapusOleh     String?  @map("dihapus_oleh")
  nilai           Decimal  @db.Decimal(5, 2)
  sumber          String?  @db.VarChar(20)
  sumberId        String?  @map("sumber_id")
  catatan         String?  @db.Text
  dibuatPada      DateTime @default(now()) @map("dibuat_pada") @db.Timestamp()
  diperbaruiPada  DateTime @updatedAt @map("diperbarui_pada") @db.Timestamp()

  pengguna      Pengguna      @relation(fields: [penggunaId], references: [id])
  kelasMapel    KelasMapel    @relation(fields: [kelasMapelId], references: [id])
  komponenNilai KomponenNilai @relation(fields: [komponenNilaiId], references: [id])

  @@map("nilai")
}

model Absensi {
  id             String   @id @default(uuid())
  penggunaId     String   @map("pengguna_id")
  kelasId        String   @map("kelas_id")
  dibuatOleh     String?  @map("dibuat_oleh")
  diperbaruiOleh String?  @map("diperbarui_oleh")
  dihapusOleh    String?  @map("dihapus_oleh")
  tanggal        DateTime @db.Date
  status         String   @db.VarChar(10)
  keterangan     String?  @db.Text
  metode         String?  @db.VarChar(20)
  lintang        Decimal? @db.Decimal(10, 8)
  bujur          Decimal? @db.Decimal(11, 8)
  urlFoto        String?  @map("url_foto") @db.VarChar(255)
  dibuatPada     DateTime @default(now()) @map("dibuat_pada") @db.Timestamp()
  diperbaruiPada DateTime @updatedAt @map("diperbarui_pada") @db.Timestamp()

  pengguna Pengguna @relation(fields: [penggunaId], references: [id])
  kelas    Kelas    @relation(fields: [kelasId], references: [id])

  @@map("absensi")
}

model Ujian {
  id                String    @id @default(uuid())
  kelasMapelId      String    @map("kelas_mapel_id")
  dibuatOleh        String?   @map("dibuat_oleh")
  diperbaruiOleh    String?   @map("diperbarui_oleh")
  dihapusOleh       String?   @map("dihapus_oleh")
  judul             String    @db.VarChar(100)
  deskripsi         String?   @db.Text
  jenis             String    @db.VarChar(20)
  durasi            Int
  waktuMulai        DateTime? @map("waktu_mulai") @db.Timestamp()
  waktuSelesai      DateTime? @map("waktu_selesai") @db.Timestamp()
  nilaiKelulusan    Decimal?  @map("nilai_kelulusan") @db.Decimal(5, 2)
  dipublikasikan    Boolean   @default(false)
  modeUjian         String?   @map("mode_ujian") @db.VarChar(20)
  penilaianOtomatis Boolean   @default(true) @map("penilaian_otomatis")
  dibuatPada        DateTime  @default(now()) @map("dibuat_pada") @db.Timestamp()
  diperbaruiPada    DateTime  @updatedAt @map("diperbarui_pada") @db.Timestamp()

  kelasMapel     KelasMapel       @relation(fields: [kelasMapelId], references: [id])
  soalUjian      SoalUjian[]
  percobaanUjian PercobaanUjian[]

  @@map("ujian")
}

model SoalUjian {
  id             String   @id @default(uuid())
  ujianId        String   @map("ujian_id")
  dibuatOleh     String?  @map("dibuat_oleh")
  diperbaruiOleh String?  @map("diperbarui_oleh")
  dihapusOleh    String?  @map("dihapus_oleh")
  teksSoal       String   @map("teks_soal") @db.Text
  jenisSoal      String   @map("jenis_soal") @db.VarChar(20)
  pilihan        Json?
  jawabanBenar   String?  @map("jawaban_benar") @db.Text
  poin           Decimal  @db.Decimal(5, 2)
  nomorUrut      Int      @map("nomor_urut")
  dibuatPada     DateTime @default(now()) @map("dibuat_pada") @db.Timestamp()
  diperbaruiPada DateTime @updatedAt @map("diperbarui_pada") @db.Timestamp()

  ujian Ujian @relation(fields: [ujianId], references: [id])

  @@map("soal_ujian")
}

model PercobaanUjian {
  id             String    @id @default(uuid())
  ujianId        String    @map("ujian_id")
  penggunaId     String    @map("pengguna_id")
  dibuatOleh     String?   @map("dibuat_oleh")
  diperbaruiOleh String?   @map("diperbarui_oleh")
  dihapusOleh    String?   @map("dihapus_oleh")
  dimulaiPada    DateTime  @map("dimulai_pada") @db.Timestamp()
  selesaiPada    DateTime? @map("selesai_pada") @db.Timestamp()
  nilai          Decimal?  @db.Decimal(5, 2)
  status         String?   @db.VarChar(20)
  dibuatPada     DateTime  @default(now()) @map("dibuat_pada") @db.Timestamp()
  diperbaruiPada DateTime  @updatedAt @map("diperbarui_pada") @db.Timestamp()

  ujian        Ujian          @relation(fields: [ujianId], references: [id])
  pengguna     Pengguna       @relation(fields: [penggunaId], references: [id])
  jawabanUjian JawabanUjian[]
  hasilUjian   HasilUjian?

  @@map("percobaan_ujian")
}

model JawabanUjian {
  id               String   @id @default(uuid())
  percobaanUjianId String   @map("percobaan_ujian_id")
  soalId           String   @map("soal_id")
  dibuatOleh       String?  @map("dibuat_oleh")
  diperbaruiOleh   String?  @map("diperbarui_oleh")
  dihapusOleh      String?  @map("dihapus_oleh")
  jawaban          String?  @db.Text
  nilai            Decimal? @db.Decimal(5, 2)
  benar            Boolean?
  dibuatPada       DateTime @default(now()) @map("dibuat_pada") @db.Timestamp()
  diperbaruiPada   DateTime @updatedAt @map("diperbarui_pada") @db.Timestamp()

  percobaanUjian PercobaanUjian @relation(fields: [percobaanUjianId], references: [id])

  @@map("jawaban_ujian")
}

model HasilUjian {
  id               String   @id @default(uuid())
  percobaanUjianId String   @unique @map("percobaan_ujian_id")
  dibuatOleh       String?  @map("dibuat_oleh")
  diperbaruiOleh   String?  @map("diperbarui_oleh")
  dihapusOleh      String?  @map("dihapus_oleh")
  totalNilai       Decimal  @map("total_nilai") @db.Decimal(5, 2)
  jumlahBenar      Int      @map("jumlah_benar")
  jumlahSalah      Int      @map("jumlah_salah")
  jumlahLewati     Int      @map("jumlah_lewati")
  detail           Json?
  dibuatPada       DateTime @default(now()) @map("dibuat_pada") @db.Timestamp()
  diperbaruiPada   DateTime @updatedAt @map("diperbarui_pada") @db.Timestamp()

  percobaanUjian PercobaanUjian @relation(fields: [percobaanUjianId], references: [id])

  @@map("hasil_ujian")
}

model Tugas {
  id             String    @id @default(uuid())
  kelasMapelId   String    @map("kelas_mapel_id")
  dibuatOleh     String?   @map("dibuat_oleh")
  diperbaruiOleh String?   @map("diperbarui_oleh")
  dihapusOleh    String?   @map("dihapus_oleh")
  judul          String    @db.VarChar(100)
  deskripsi      String?   @db.Text
  batasWaktu     DateTime? @map("batas_waktu") @db.Timestamp()
  dibuatPada     DateTime  @default(now()) @map("dibuat_pada") @db.Timestamp()
  diperbaruiPada DateTime  @updatedAt @map("diperbarui_pada") @db.Timestamp()

  kelasMapel KelasMapel @relation(fields: [kelasMapelId], references: [id])

  @@map("tugas")
}

model PengumpulanTugas {
  id             String   @id @default(uuid())
  tugasId        String   @map("tugas_id")
  penggunaId     String   @map("pengguna_id")
  dibuatOleh     String?  @map("dibuat_oleh")
  diperbaruiOleh String?  @map("diperbarui_oleh")
  dihapusOleh    String?  @map("dihapus_oleh")
  urlFile        String?  @map("url_file") @db.VarChar(255)
  status         String?  @db.VarChar(20)
  nilai          Decimal? @db.Decimal(5, 2)
  keterangan     String?  @db.Text
  dibuatPada     DateTime @default(now()) @map("dibuat_pada") @db.Timestamp()
  diperbaruiPada DateTime @updatedAt @map("diperbarui_pada") @db.Timestamp()

  pengguna Pengguna @relation(fields: [penggunaId], references: [id])

  @@map("pengumpulan_tugas")
}

model MateriPembelajaran {
  id             String   @id @default(uuid())
  kelasMapelId   String   @map("kelas_mapel_id")
  dibuatOleh     String?  @map("dibuat_oleh")
  diperbaruiOleh String?  @map("diperbarui_oleh")
  dihapusOleh    String?  @map("dihapus_oleh")
  judul          String   @db.VarChar(100)
  deskripsi      String?  @db.Text
  urlFile        String?  @map("url_file") @db.VarChar(255)
  kategori       String?  @db.VarChar(50)
  dibuatPada     DateTime @default(now()) @map("dibuat_pada") @db.Timestamp()
  diperbaruiPada DateTime @updatedAt @map("diperbarui_pada") @db.Timestamp()

  kelasMapel KelasMapel @relation(fields: [kelasMapelId], references: [id])

  @@map("materi_pembelajaran")
}

model Aset {
  id                 String    @id @default(uuid())
  sekolahId          String    @map("sekolah_id")
  kategoriAsetId     String    @map("kategori_aset_id")
  gudangId           String    @map("gudang_id")
  dibuatOleh         String?   @map("dibuat_oleh")
  diperbaruiOleh     String?   @map("diperbarui_oleh")
  dihapusOleh        String?   @map("dihapus_oleh")
  nama               String    @db.VarChar(100)
  kode               String    @unique @db.VarChar(50)
  kondisi            String    @db.VarChar(20)
  jumlah             Int
  jumlahStok         Int       @map("jumlah_stok")
  stokMinimum        Int       @map("stok_minimum")
  lokasi             String?   @db.VarChar(100)
  status             String?   @db.VarChar(20)
  tanggalPembelian   DateTime? @map("tanggal_pembelian") @db.Date
  perawatanTerakhir  DateTime? @map("perawatan_terakhir") @db.Date
  tanggalRusak       DateTime? @map("tanggal_rusak") @db.Date
  deskripsiKerusakan String?   @map("deskripsi_kerusakan") @db.Text
  statusPerbaikan    String?   @map("status_perbaikan") @db.VarChar(20)
  catatan            String?   @db.Text
  dibuatPada         DateTime  @default(now()) @map("dibuat_pada") @db.Timestamp()
  diperbaruiPada     DateTime  @updatedAt @map("diperbarui_pada") @db.Timestamp()
  dihapusPada        DateTime? @map("dihapus_pada") @db.Timestamp()

  sekolah Sekolah @relation(fields: [sekolahId], references: [id])

  @@map("aset")
}

model Gudang {
  id             String    @id @default(uuid())
  sekolahId      String    @map("sekolah_id")
  dibuatOleh     String?   @map("dibuat_oleh")
  diperbaruiOleh String?   @map("diperbarui_oleh")
  dihapusOleh    String?   @map("dihapus_oleh")
  nama           String    @db.VarChar(100)
  lokasi         String?   @db.VarChar(255)
  status         String?   @db.VarChar(20)
  dibuatPada     DateTime  @default(now()) @map("dibuat_pada") @db.Timestamp()
  diperbaruiPada DateTime  @updatedAt @map("diperbarui_pada") @db.Timestamp()
  dihapusPada    DateTime? @map("dihapus_pada") @db.Timestamp()

  @@map("gudang")
}

model KategoriAset {
  id             String    @id @default(uuid())
  sekolahId      String    @map("sekolah_id")
  dibuatOleh     String?   @map("dibuat_oleh")
  diperbaruiOleh String?   @map("diperbarui_oleh")
  dihapusOleh    String?   @map("dihapus_oleh")
  nama           String    @db.VarChar(50)
  status         String?   @db.VarChar(20)
  dibuatPada     DateTime  @default(now()) @map("dibuat_pada") @db.Timestamp()
  diperbaruiPada DateTime  @updatedAt @map("diperbarui_pada") @db.Timestamp()
  dihapusPada    DateTime? @map("dihapus_pada") @db.Timestamp()

  @@map("kategori_aset")
}

model LaporanKerusakan {
  id               String    @id @default(uuid())
  sekolahId        String    @map("sekolah_id")
  asetId           String    @map("aset_id")
  dilaporkanOleh   String    @map("dilaporkan_oleh")
  dibuatOleh       String?   @map("dibuat_oleh")
  diperbaruiOleh   String?   @map("diperbarui_oleh")
  dihapusOleh      String?   @map("dihapus_oleh")
  tanggalLaporan   DateTime  @map("tanggal_laporan") @db.Timestamp()
  deskripsi        String    @db.Text
  status           String?   @db.VarChar(20)
  catatanPerbaikan String?   @map("catatan_perbaikan") @db.Text
  dibuatPada       DateTime  @default(now()) @map("dibuat_pada") @db.Timestamp()
  diperbaruiPada   DateTime  @updatedAt @map("diperbarui_pada") @db.Timestamp()
  dihapusPada      DateTime? @map("dihapus_pada") @db.Timestamp()

  @@map("laporan_kerusakan")
}

model HalamanCms {
  id             String    @id @default(uuid())
  sekolahId      String    @map("sekolah_id")
  dibuatOleh     String?   @map("dibuat_oleh")
  diperbaruiOleh String?   @map("diperbarui_oleh")
  dihapusOleh    String?   @map("dihapus_oleh")
  judul          String    @db.VarChar(100)
  slug           String    @unique @db.VarChar(100)
  konten         String?   @db.Text
  status         String?   @db.VarChar(20)
  dibuatPada     DateTime  @default(now()) @map("dibuat_pada") @db.Timestamp()
  diperbaruiPada DateTime  @updatedAt @map("diperbarui_pada") @db.Timestamp()
  dihapusPada    DateTime? @map("dihapus_pada") @db.Timestamp()

  sekolah Sekolah @relation(fields: [sekolahId], references: [id])

  @@map("halaman_cms")
}

model ArtikelCms {
  id                 String    @id @default(uuid())
  sekolahId          String    @map("sekolah_id")
  kategoriArtikelId  String?   @map("kategori_artikel_id")
  dibuatOleh         String?   @map("dibuat_oleh")
  diperbaruiOleh     String?   @map("diperbarui_oleh")
  dihapusOleh        String?   @map("dihapus_oleh")
  judul              String    @db.VarChar(100)
  slug               String    @unique @db.VarChar(100)
  konten             String?   @db.Text
  ringkasan          String?   @db.Text
  gambarUtama        String?   @map("gambar_utama") @db.VarChar(255)
  status             String?   @db.VarChar(20)
  dipublikasikanPada DateTime? @map("dipublikasikan_pada") @db.Timestamp()
  dibuatPada         DateTime  @default(now()) @map("dibuat_pada") @db.Timestamp()
  diperbaruiPada     DateTime  @updatedAt @map("diperbarui_pada") @db.Timestamp()
  dihapusPada        DateTime? @map("dihapus_pada") @db.Timestamp()

  sekolah         Sekolah          @relation(fields: [sekolahId], references: [id])
  kategoriArtikel KategoriArtikel? @relation(fields: [kategoriArtikelId], references: [id])

  @@map("artikel_cms")
}

model KategoriArtikel {
  id             String    @id @default(uuid())
  sekolahId      String    @map("sekolah_id")
  dibuatOleh     String?   @map("dibuat_oleh")
  diperbaruiOleh String?   @map("diperbarui_oleh")
  dihapusOleh    String?   @map("dihapus_oleh")
  nama           String    @db.VarChar(50)
  slug           String    @unique @db.VarChar(50)
  status         String?   @db.VarChar(20)
  dibuatPada     DateTime  @default(now()) @map("dibuat_pada") @db.Timestamp()
  diperbaruiPada DateTime  @updatedAt @map("diperbarui_pada") @db.Timestamp()
  dihapusPada    DateTime? @map("dihapus_pada") @db.Timestamp()

  artikelCms ArtikelCms[]

  @@map("kategori_artikel")
}

model JalurPpdb {
  id             String    @id @default(uuid())
  sekolahId      String    @map("sekolah_id")
  dibuatOleh     String?   @map("dibuat_oleh")
  diperbaruiOleh String?   @map("diperbarui_oleh")
  dihapusOleh    String?   @map("dihapus_oleh")
  nama           String    @db.VarChar(50)
  deskripsi      String?   @db.Text
  kuota          Int
  tanggalMulai   DateTime? @map("tanggal_mulai") @db.Date
  tanggalSelesai DateTime? @map("tanggal_selesai") @db.Date
  status         String?   @db.VarChar(20)
  dibuatPada     DateTime  @default(now()) @map("dibuat_pada") @db.Timestamp()
  diperbaruiPada DateTime  @updatedAt @map("diperbarui_pada") @db.Timestamp()
  dihapusPada    DateTime? @map("dihapus_pada") @db.Timestamp()

  sekolah         Sekolah           @relation(fields: [sekolahId], references: [id])
  pendaftaranPpdb PendaftaranPpdb[]

  @@map("jalur_ppdb")
}

model PendaftaranPpdb {
  id                     String    @id @default(uuid())
  sekolahId              String    @map("sekolah_id")
  jalurPpdbId            String    @map("jalur_ppdb_id")
  dibuatOleh             String?   @map("dibuat_oleh")
  diperbaruiOleh         String?   @map("diperbarui_oleh")
  dihapusOleh            String?   @map("dihapus_oleh")
  nomorPendaftaran       String    @unique @map("nomor_pendaftaran") @db.VarChar(20)
  namaLengkap            String    @map("nama_lengkap") @db.VarChar(100)
  nisn                   String    @unique @db.VarChar(20)
  tempatLahir            String    @map("tempat_lahir") @db.VarChar(50)
  tanggalLahir           DateTime  @map("tanggal_lahir") @db.Date
  jenisKelamin           String    @map("jenis_kelamin") @db.VarChar(10)
  alamat                 String    @db.Text
  telepon                String?   @db.VarChar(20)
  email                  String?   @db.VarChar(100)
  namaAyah               String?   @map("nama_ayah") @db.VarChar(100)
  namaIbu                String?   @map("nama_ibu") @db.VarChar(100)
  asalSekolah            String?   @map("asal_sekolah") @db.VarChar(100)
  nilaiRapor             Decimal?  @map("nilai_rapor") @db.Decimal(5, 2)
  status                 String?   @db.VarChar(20)
  kelasId                String?   @map("kelas_id")
  dikonversiKePenggunaId String?   @map("dikonversi_ke_pengguna_id")
  dikonversiPada         DateTime? @map("dikonversi_pada") @db.Timestamp()
  dibuatPada             DateTime  @default(now()) @map("dibuat_pada") @db.Timestamp()
  diperbaruiPada         DateTime  @updatedAt @map("diperbarui_pada") @db.Timestamp()
  dihapusPada            DateTime? @map("dihapus_pada") @db.Timestamp()

  sekolah          Sekolah           @relation(fields: [sekolahId], references: [id])
  jalurPpdb        JalurPpdb         @relation(fields: [jalurPpdbId], references: [id])
  pengguna         Pengguna?         @relation(fields: [dikonversiKePenggunaId], references: [id])
  berkasPpdb       BerkasPpdb[]
  hasilSeleksiPpdb HasilSeleksiPpdb?

  @@map("pendaftaran_ppdb")
}

model BerkasPpdb {
  id                String    @id @default(uuid())
  pendaftaranPpdbId String    @map("pendaftaran_ppdb_id")
  dibuatOleh        String?   @map("dibuat_oleh")
  diperbaruiOleh    String?   @map("diperbarui_oleh")
  dihapusOleh       String?   @map("dihapus_oleh")
  namaBerkas        String    @map("nama_berkas") @db.VarChar(50)
  urlFile           String    @map("url_file") @db.VarChar(255)
  status            String?   @db.VarChar(20)
  keterangan        String?   @db.Text
  dibuatPada        DateTime  @default(now()) @map("dibuat_pada") @db.Timestamp()
  diperbaruiPada    DateTime  @updatedAt @map("diperbarui_pada") @db.Timestamp()
  dihapusPada       DateTime? @map("dihapus_pada") @db.Timestamp()

  pendaftaranPpdb PendaftaranPpdb @relation(fields: [pendaftaranPpdbId], references: [id])

  @@map("berkas_ppdb")
}

model HasilSeleksiPpdb {
  id                String    @id @default(uuid())
  pendaftaranPpdbId String    @unique @map("pendaftaran_ppdb_id")
  dibuatOleh        String?   @map("dibuat_oleh")
  diperbaruiOleh    String?   @map("diperbarui_oleh")
  dihapusOleh       String?   @map("dihapus_oleh")
  nilaiTes          Decimal?  @map("nilai_tes") @db.Decimal(5, 2)
  peringkat         Int?
  statusKelulusan   String?   @map("status_kelulusan") @db.VarChar(20)
  catatan           String?   @db.Text
  dibuatPada        DateTime  @default(now()) @map("dibuat_pada") @db.Timestamp()
  diperbaruiPada    DateTime  @updatedAt @map("diperbarui_pada") @db.Timestamp()
  dihapusPada       DateTime? @map("dihapus_pada") @db.Timestamp()

  pendaftaranPpdb PendaftaranPpdb @relation(fields: [pendaftaranPpdbId], references: [id])

  @@map("hasil_seleksi_ppdb")
}

// ==========================================
// 3. LMS TABLES
// ==========================================

enum TipeSoal {
  pilihan_ganda
  esai
  benar_salah
}

enum StatusSesiKuis {
  sedang_mengerjakan
  selesai
  dinilai
}

model Kuis {
  id             String    @id @default(uuid())
  judul          String
  deskripsi      String?   @db.Text
  durasiMenit    Int       @map("durasi_menit")
  waktuMulai     DateTime? @map("waktu_mulai") @db.Timestamp()
  waktuSelesai   DateTime? @map("waktu_selesai") @db.Timestamp()
  sekolahId      String    @map("sekolah_id")
  pembuatId      String    @map("pembuat_id")
  dibuatPada     DateTime  @default(now()) @map("dibuat_pada") @db.Timestamp()
  diperbaruiPada DateTime  @updatedAt @map("diperbarui_pada") @db.Timestamp()

  sekolah Sekolah  @relation(fields: [sekolahId], references: [id], onDelete: Cascade)
  pembuat Pengguna @relation("PembuatKuis", fields: [pembuatId], references: [id], onDelete: Cascade)

  soal          Soal[]
  sesiKuisSiswa SesiKuisSiswa[]

  @@index([sekolahId])
  @@index([pembuatId])
  @@map("kuis")
}

model Soal {
  id             String   @id @default(uuid())
  kuisId         String   @map("kuis_id")
  pertanyaan     String   @db.Text
  tipeSoal       TipeSoal @map("tipe_soal")
  bobotNilai     Float    @default(1.0) @map("bobot_nilai")
  pilihan        Json?
  kunciJawaban   String   @map("kunci_jawaban") @db.Text
  dibuatPada     DateTime @default(now()) @map("dibuat_pada") @db.Timestamp()
  diperbaruiPada DateTime @updatedAt @map("diperbarui_pada") @db.Timestamp()

  kuis         Kuis           @relation(fields: [kuisId], references: [id], onDelete: Cascade)
  jawabanSiswa JawabanSiswa[]

  @@index([kuisId])
  @@map("soal")
}

model SesiKuisSiswa {
  id           String         @id @default(uuid())
  kuisId       String         @map("kuis_id")
  siswaId      String         @map("siswa_id")
  waktuMulai   DateTime       @default(now()) @map("waktu_mulai") @db.Timestamp()
  waktuSelesai DateTime?      @map("waktu_selesai") @db.Timestamp()
  nilaiAkhir   Float?         @map("nilai_akhir")
  status       StatusSesiKuis @default(sedang_mengerjakan)

  kuis         Kuis           @relation(fields: [kuisId], references: [id], onDelete: Cascade)
  siswa        Pengguna       @relation(fields: [siswaId], references: [id], onDelete: Cascade)
  jawabanSiswa JawabanSiswa[]

  @@unique([kuisId, siswaId])
  @@index([kuisId])
  @@index([siswaId])
  @@map("sesi_kuis_siswa")
}

model JawabanSiswa {
  id              String   @id @default(uuid())
  sesiKuisSiswaId String   @map("sesi_kuis_siswa_id")
  soalId          String   @map("soal_id")
  jawaban         String   @db.Text
  nilaiDiperoleh  Float?   @map("nilai_diperoleh")
  catatanGuru     String?  @map("catatan_guru") @db.Text
  dibuatPada      DateTime @default(now()) @map("dibuat_pada") @db.Timestamp()
  diperbaruiPada  DateTime @updatedAt @map("diperbarui_pada") @db.Timestamp()

  sesiKuisSiswa SesiKuisSiswa @relation(fields: [sesiKuisSiswaId], references: [id], onDelete: Cascade)
  soal          Soal          @relation(fields: [soalId], references: [id], onDelete: Cascade)

  @@unique([sesiKuisSiswaId, soalId])
  @@index([sesiKuisSiswaId])
  @@index([soalId])
  @@map("jawaban_siswa")
}

model PendaftaranSekolah {
  id              String    @id @default(uuid())
  nama            String
  email           String
  kataSandi       String    @map("kata_sandi")
  namaSekolah     String    @map("nama_sekolah")
  jenjang         String
  subdomain       String
  alamatSekolah   String    @map("alamat_sekolah")
  teleponSekolah  String    @map("telepon_sekolah")
  logo            String?
  paketId         String    @map("paket_id")
  yayasanId       String?   @map("yayasan_id")
  kodeOtp         String?   @map("kode_otp")
  otpTimeout      DateTime? @map("otp_timeout")
  status          String    @default("menunggu_verifikasi")
  midtransOrderId String?   @map("midtrans_order_id")
  dibuatPada      DateTime  @default(now()) @map("dibuat_pada") @db.Timestamp()
  diperbaruiPada  DateTime  @updatedAt @map("diperbarui_pada") @db.Timestamp()

  @@map("pendaftaran_sekolah")
}

```

## prisma/seed.ts

```typescript
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

```

## src/app.ts

```typescript
import express, { Application, Request, Response } from "express";
import cors from "cors";
import { globalErrorHandler } from "./middlewares/error.middleware";
import userRoutes from "./routes/user.routes";
import subscriptionRoutes from "./routes/subscription.routes";
import paketRoutes from "./routes/paket.routes";
import akademikRoutes from "./routes/akademik.routes";
import siswaRoutes from "./routes/siswa.routes";
import tahunAjaranRoutes from "./routes/tahunAjaran.routes";
import kelasRoutes from "./routes/kelas.routes";
import mataPelajaranRoutes from "./routes/mataPelajaran";
import kelasMapelRoutes from "./routes/kelasMapel.routes";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import authRoutes from "./routes/auth.routes";
import tenantRoutes from "./routes/tenant.routes";
import webhookRoutes from "./routes/webhook.routes";

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "SmartSchool API is running smoothly! 🚀",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/v1/langganan/sekolah", subscriptionRoutes);
app.use("/api/v1/tenant", tenantRoutes);
app.use("/api/v1/webhooks", webhookRoutes);
app.use("/api/v1/paket", paketRoutes);
app.use("/api/v1/akademik", akademikRoutes);
app.use("/api/v1/siswa", siswaRoutes);
app.use("/api/tahun-ajaran", tahunAjaranRoutes);
app.use("/api/kelas", kelasRoutes);
app.use("/api/mata-pelajaran", mataPelajaranRoutes);
app.use("/api/kelas-mapel", kelasMapelRoutes);

app.use(globalErrorHandler);

export default app;

```

## src/config/db.ts

```typescript
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import * as dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({ adapter });

```

## src/controllers/akademik.controller.ts

```typescript
import { Request, Response, NextFunction } from "express";
import { prisma } from "../config/db";
import { AppError } from "../utils/appError";
import { tahunAjaranSchema, kelasSchema } from "../validations/akademik.validation";

// === TAHUN AJARAN ===

export const createTahunAjaran = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sekolahId = (req as any).user?.sekolahId as string;
    if (!sekolahId) throw new AppError("Akses ditolak. Sekolah ID tidak ditemukan.", 403);

    const validatedData = tahunAjaranSchema.parse(req.body);

    if (validatedData.status === "aktif") {
      await prisma.$transaction([
        prisma.tahunAjaran.updateMany({
          where: { sekolahId },
          data: { status: "tidak_aktif" },
        }),
        prisma.tahunAjaran.create({
          data: {
            ...validatedData,
            sekolahId,
          },
        }),
      ]);
    } else {
      await prisma.tahunAjaran.create({
        data: {
          ...validatedData,
          sekolahId,
        },
      });
    }

    res.status(201).json({
      success: true,
      message: "Tahun Ajaran berhasil dibuat",
    });
  } catch (error) {
    next(error);
  }
};

export const updateTahunAjaran = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sekolahId = (req as any).user?.sekolahId as string;
    const id = req.params.id as string;

    const validatedData = tahunAjaranSchema.parse(req.body);

    if (validatedData.status === "aktif") {
      await prisma.$transaction([
        prisma.tahunAjaran.updateMany({
          where: { sekolahId, id: { not: id } },
          data: { status: "tidak_aktif" },
        }),
        prisma.tahunAjaran.update({
          where: { id },
          data: validatedData,
        }),
      ]);
    } else {
      await prisma.tahunAjaran.update({
        where: { id },
        data: validatedData,
      });
    }

    res.status(200).json({
      success: true,
      message: "Tahun Ajaran berhasil diperbarui",
    });
  } catch (error) {
    next(error);
  }
};

export const getTahunAjaran = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sekolahId = (req as any).user?.sekolahId as string;
    const data = await prisma.tahunAjaran.findMany({
      where: { sekolahId },
      orderBy: { dibuatPada: "desc" },
    });
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

// === KELAS ===

export const createKelas = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sekolahId = (req as any).user?.sekolahId as string;
    if (!sekolahId) throw new AppError("Akses ditolak. Sekolah ID tidak ditemukan.", 403);

    const validatedData = kelasSchema.parse(req.body);

    // Ambil data sekolah untuk validasi jenjang
    const sekolah = await prisma.sekolah.findUnique({
      where: { id: sekolahId },
    });

    if (!sekolah) throw new AppError("Sekolah tidak ditemukan", 404);

    const konfigurasi = sekolah.konfigurasi as { jenjang?: string } | null;
    const jenjang = konfigurasi?.jenjang;

    if (jenjang) {
      const { tingkat } = validatedData;
      if (jenjang === "SD" && (tingkat < 1 || tingkat > 6)) {
        throw new AppError("Untuk jenjang SD, tingkat kelas harus antara 1 dan 6", 400);
      } else if (jenjang === "SMP" && (tingkat < 7 || tingkat > 9)) {
        throw new AppError("Untuk jenjang SMP, tingkat kelas harus antara 7 dan 9", 400);
      } else if ((jenjang === "SMA" || jenjang === "SMK") && (tingkat < 10 || tingkat > 13)) {
        throw new AppError(`Untuk jenjang ${jenjang}, tingkat kelas harus antara 10 dan 13`, 400);
      }
    }

    const kelas = await prisma.kelas.create({
      data: {
        ...validatedData,
        sekolahId,
      },
    });

    res.status(201).json({
      success: true,
      message: "Kelas berhasil dibuat",
      data: kelas,
    });
  } catch (error) {
    next(error);
  }
};

export const getKelas = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sekolahId = (req as any).user?.sekolahId as string;
    const data = await prisma.kelas.findMany({
      where: { sekolahId },
      include: {
        tahunAjaran: true,
        waliKelas: {
          select: { id: true, namaLengkap: true }
        }
      },
      orderBy: [{ tingkat: "asc" }, { nama: "asc" }]
    });
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

```

## src/controllers/auth.controller.ts

```typescript
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { prisma } from "../config/db";
import {
  registerSchema,
  verifySchema,
  loginSchema,
  verifyLoginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from "../validations/auth.validation";
import { generateOtp } from "../utils/generateOtp";
import { sendOtpEmail } from "../utils/email";
import { AppError } from "../utils/appError";
import { generateAccessToken } from "../utils/generateToken";

export const register = async (req: Request, res: Response) => {
  const data = registerSchema.parse(req.body);

  const existingUser = await prisma.pengguna.findFirst({
    where: {
      OR: [{ email: data.email }, { namaPengguna: data.namaPengguna }],
    },
  });

  if (existingUser) {
    if (existingUser.status === "aktif") {
      throw new AppError("Email atau username sudah terdaftar dan aktif", 400);
    }
  }

  const hashedPassword = await bcrypt.hash(data.kataSandi, 10);
  const otpCode = generateOtp();
  const otpTimeout = new Date(Date.now() + 5 * 60 * 1000); // 5 menit

  if (existingUser && existingUser.status === "menunggu_verifikasi") {
    await prisma.pengguna.update({
      where: { id: existingUser.id },
      data: {
        namaLengkap: data.namaLengkap,
        kataSandi: hashedPassword,
        kodeOtp: otpCode,
        otpTimeout: otpTimeout,
      },
    });
  } else {
    await prisma.pengguna.create({
      data: {
        email: data.email,
        namaPengguna: data.namaPengguna,
        namaLengkap: data.namaLengkap,
        kataSandi: hashedPassword,
        status: "menunggu_verifikasi",
        kodeOtp: otpCode,
        otpTimeout: otpTimeout,
      },
    });
  }

  await sendOtpEmail({
    email: data.email,
    namaLengkap: data.namaLengkap,
    kodeOtp: otpCode,
  });

  res.status(200).json({
    success: true,
    message:
      "Registrasi berhasil. Silakan cek email Anda untuk kode OTP verifikasi.",
  });
};

export const verifyRegister = async (req: Request, res: Response) => {
  const data = verifySchema.parse(req.body);

  const user = await prisma.pengguna.findUnique({
    where: { email: data.email },
  });

  if (!user || user.status !== "menunggu_verifikasi") {
    throw new AppError(
      "Pengguna tidak ditemukan atau sudah terverifikasi",
      400,
    );
  }

  if (user.kodeOtp !== data.kodeOtp) {
    throw new AppError("Kode OTP salah", 400);
  }

  if (!user.otpTimeout || user.otpTimeout < new Date()) {
    throw new AppError("Kode OTP sudah kedaluwarsa", 400);
  }

  await prisma.pengguna.update({
    where: { id: user.id },
    data: {
      status: "aktif",
      kodeOtp: null,
      otpTimeout: null,
    },
  });

  // Gunakan generateAccessToken agar payload sesuai (userId)
  const token = generateAccessToken({
    userId: user.id,
    email: user.email,
    roleId: user.peranId || undefined,
    sekolahId: user.sekolahId || undefined,
  });

  res.status(200).json({
    success: true,
    message: "Verifikasi berhasil. Anda sekarang telah login.",
    token,
  });
};

export const login = async (req: Request, res: Response) => {
  const data = loginSchema.parse(req.body);

  const user = await prisma.pengguna.findFirst({
    where: {
      OR: [{ email: data.identifier }, { namaPengguna: data.identifier }],
    },
  });

  if (!user) {
    throw new AppError("Kredensial tidak valid", 401);
  }

  if (user.status !== "aktif") {
    throw new AppError("Akun belum diverifikasi atau tidak aktif", 401);
  }

  const isMatch = await bcrypt.compare(data.kataSandi, user.kataSandi);
  if (!isMatch) {
    throw new AppError("Kredensial tidak valid", 401);
  }

  const otpCode = generateOtp();
  const otpTimeout = new Date(Date.now() + 5 * 60 * 1000); // 5 menit

  await prisma.pengguna.update({
    where: { id: user.id },
    data: {
      kodeOtp: otpCode,
      otpTimeout: otpTimeout,
    },
  });

  await sendOtpEmail({
    email: user.email,
    namaLengkap: user.namaLengkap,
    kodeOtp: otpCode,
  });

  res.status(200).json({
    success: true,
    message: "Silakan cek email Anda untuk kode OTP login.",
  });
};

export const verifyLogin = async (req: Request, res: Response) => {
  const data = verifyLoginSchema.parse(req.body);

  const user = await prisma.pengguna.findFirst({
    where: {
      OR: [{ email: data.identifier }, { namaPengguna: data.identifier }],
    },
  });

  if (!user || user.status !== "aktif") {
    throw new AppError("Pengguna tidak ditemukan atau tidak aktif", 401);
  }

  if (user.kodeOtp !== data.kodeOtp) {
    throw new AppError("Kode OTP salah", 401);
  }

  if (!user.otpTimeout || user.otpTimeout < new Date()) {
    throw new AppError("Kode OTP sudah kedaluwarsa", 401);
  }

  await prisma.pengguna.update({
    where: { id: user.id },
    data: {
      kodeOtp: null,
      otpTimeout: null,
      terakhirLogin: new Date(),
    },
  });

  // Gunakan generateAccessToken agar payload sesuai (userId)
  const token = generateAccessToken({
    userId: user.id,
    email: user.email,
    roleId: user.peranId || undefined,
    sekolahId: user.sekolahId || undefined,
  });

  res.status(200).json({
    success: true,
    message: "Login berhasil",
    token,
  });
};

export const forgotPassword = async (req: Request, res: Response) => {
  const data = forgotPasswordSchema.parse(req.body);

  const user = await prisma.pengguna.findUnique({
    where: { email: data.email },
  });

  if (!user || user.status !== "aktif") {
    return res.status(200).json({
      success: true,
      message: "Jika email terdaftar, kode OTP reset password telah dikirim",
    });
  }

  const otpCode = generateOtp();
  const otpTimeout = new Date(Date.now() + 5 * 60 * 1000); // 5 menit

  await prisma.pengguna.update({
    where: { id: user.id },
    data: {
      kodeOtp: otpCode,
      otpTimeout: otpTimeout,
    },
  });

  await sendOtpEmail({
    email: user.email,
    namaLengkap: user.namaLengkap,
    kodeOtp: otpCode,
  });

  res.status(200).json({
    success: true,
    message: "Silakan cek email Anda untuk kode OTP reset password.",
  });
};

export const resetPassword = async (req: Request, res: Response) => {
  const data = resetPasswordSchema.parse(req.body);

  const user = await prisma.pengguna.findUnique({
    where: { email: data.email },
  });

  if (!user || user.status !== "aktif") {
    throw new AppError("Pengguna tidak ditemukan atau tidak aktif", 401);
  }

  if (user.kodeOtp !== data.kodeOtp) {
    throw new AppError("Kode OTP salah", 400);
  }

  if (!user.otpTimeout || user.otpTimeout < new Date()) {
    throw new AppError("Kode OTP sudah kedaluwarsa", 400);
  }

  const hashedPassword = await bcrypt.hash(data.kataSandi, 10);
  await prisma.pengguna.update({
    where: { id: user.id },
    data: {
      kataSandi: hashedPassword,
      kodeOtp: null,
      otpTimeout: null,
    },
  });

  res.status(200).json({
    success: true,
    message: "Reset password berhasil",
  });
};
```

## src/controllers/kelas.controller.ts

```typescript
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
```

## src/controllers/kelasMapel.controller.ts

```typescript
import { Request, Response } from "express";
import { prisma } from "../config/db";

interface KelasMapelBody {
  kelasId: string;
  mataPelajaranId: string;
  guruPengajarId: string;
};

export const getKelasMapel = async (
  req: Request,
  res: Response
) => {
  try {
    const sekolahId = (req as any).user?.sekolahId;

    const data = await prisma.kelasMapel.findMany({
      where: {
        dihapusPada: null,

        kelas: {
          sekolahId,
        },
      },

      include: {
        kelas: true,

        mataPelajaran: true,

        guruPengajar: {
          select: {
            id: true,
            namaLengkap: true,
            email: true,
            nip: true,
            nuptk: true,
          },
        },
      },

      orderBy: {
        dibuatPada: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      message: "Berhasil mengambil data mata pelajaran kelas",
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

export const createKelasMapel = async (
  req: Request<{}, {}, KelasMapelBody>,
  res: Response
) => {
  try {
    const sekolahId = (req as any).user?.sekolahId;

    const {
      kelasId,
      mataPelajaranId,
      guruPengajarId,
    } = req.body;

    if (
      !kelasId ||
      !mataPelajaranId ||
      !guruPengajarId
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Kelas, mata pelajaran, dan guru pengajar wajib diisi",
      });
    }

    const kelas = await prisma.kelas.findFirst({
      where: {
        id: kelasId,
        sekolahId,
        dihapusPada: null,
      },
    });

    if (!kelas) {
      return res.status(404).json({
        success: false,
        message: "Kelas tidak ditemukan",
      });
    }

    const mataPelajaran =
      await prisma.mataPelajaran.findFirst({
        where: {
          id: mataPelajaranId,
          sekolahId,
          dihapusPada: null,
        },
      });

    if (!mataPelajaran) {
      return res.status(404).json({
        success: false,
        message: "Mata pelajaran tidak ditemukan",
      });
    }

    const guru = await prisma.pengguna.findFirst({
      where: {
        id: guruPengajarId,
        sekolahId,
        dihapusPada: null,
      },
    });

    if (!guru) {
      return res.status(404).json({
        success: false,
        message: "Guru pengajar tidak ditemukan",
      });
    }

    const existing =
      await prisma.kelasMapel.findFirst({
        where: {
          kelasId,
          mataPelajaranId,
          dihapusPada: null,
        },
      });

    if (existing) {
      return res.status(409).json({
        success: false,
        message:
          "Mata pelajaran sudah diassign ke kelas tersebut",
      });
    }

    const data = await prisma.kelasMapel.create({
      data: {
        kelasId,
        mataPelajaranId,
        guruPengajarId,
        status: "aktif",
      },

      include: {
        kelas: true,
        mataPelajaran: true,
        guruPengajar: {
          select: {
            id: true,
            namaLengkap: true,
            email: true,
          },
        },
      },
    });

    return res.status(201).json({
      success: true,
      message:
        "Mata pelajaran berhasil diassign ke kelas",
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

export const updateKelasMapel = async (
  req: Request<
    { id: string },
    {},
    Partial<KelasMapelBody>
  >,
  res: Response
) => {
  try {
    const sekolahId = (req as any).user?.sekolahId;
    const { id } = req.params;

    const existing =
      await prisma.kelasMapel.findFirst({
        where: {
          id,
          dihapusPada: null,

          kelas: {
            sekolahId,
          },
        },
      });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Data kelas mapel tidak ditemukan",
      });
    }

    const {
      kelasId,
      mataPelajaranId,
      guruPengajarId,
    } = req.body;

    if (kelasId) {
      const kelas =
        await prisma.kelas.findFirst({
          where: {
            id: kelasId,
            sekolahId,
            dihapusPada: null,
          },
        });

      if (!kelas) {
        return res.status(404).json({
          success: false,
          message: "Kelas tidak ditemukan",
        });
      }
    }

    if (mataPelajaranId) {
      const mapel =
        await prisma.mataPelajaran.findFirst({
          where: {
            id: mataPelajaranId,
            sekolahId,
            dihapusPada: null,
          },
        });

      if (!mapel) {
        return res.status(404).json({
          success: false,
          message: "Mata pelajaran tidak ditemukan",
        });
      }
    }

    if (guruPengajarId) {
      const guru =
        await prisma.pengguna.findFirst({
          where: {
            id: guruPengajarId,
            sekolahId,
            dihapusPada: null,
          },
        });

      if (!guru) {
        return res.status(404).json({
          success: false,
          message: "Guru pengajar tidak ditemukan",
        });
      }
    }

    const data =
      await prisma.kelasMapel.update({
        where: {
          id,
        },
        data: {
          ...(kelasId && { kelasId }),
          ...(mataPelajaranId && {
            mataPelajaranId,
          }),
          ...(guruPengajarId && {
            guruPengajarId,
          }),
        },

        include: {
          kelas: true,
          mataPelajaran: true,
          guruPengajar: {
            select: {
              id: true,
              namaLengkap: true,
              email: true,
            },
          },
        },
      });

    return res.status(200).json({
      success: true,
      message: "Data kelas mapel berhasil diperbarui",
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

export const deleteKelasMapel = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const sekolahId = (req as any).user?.sekolahId;
    const { id } = req.params;

    const existing =
      await prisma.kelasMapel.findFirst({
        where: {
          id,
          dihapusPada: null,

          kelas: {
            sekolahId,
          },
        },
      });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Data kelas mapel tidak ditemukan",
      });
    }

    await prisma.kelasMapel.update({
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
      message: "Mata pelajaran dari kelas berhasil dihapus",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
```

## src/controllers/mataPelajaran.controller.ts

```typescript
import { Request, Response } from "express";
import { prisma } from "../config/db";

interface MataPelajaranBody {
  nama: string;
  kode: string;
  status?: string;
}

export const getMataPelajaran = async (
  req: Request,
  res: Response
) => {
  try {
    const sekolahId = (req as any).user?.sekolahId;

    const data =
      await prisma.mataPelajaran.findMany({
        where: {
          sekolahId,
          dihapusPada: null,
        },
        orderBy: {
          nama: "asc",
        },
      });

    return res.status(200).json({
      success: true,
      message: "Berhasil mengambil data mata pelajaran",
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

export const createMataPelajaran = async (
  req: Request<{}, {}, MataPelajaranBody>,
  res: Response
) => {
  try {
    const sekolahId = (req as any).user?.sekolahId;

    const {
      nama,
      kode,
      status = "aktif",
    } = req.body;

    if (!nama || !kode) {
      return res.status(400).json({
        success: false,
        message: "Nama dan kode mata pelajaran wajib diisi",
      });
    }

    const existing =
      await prisma.mataPelajaran.findFirst({
        where: {
          kode,
          sekolahId,
          dihapusPada: null,
        },
      });

    if (existing) {
      return res.status(409).json({
        success: false,
        message: "Kode mata pelajaran sudah digunakan",
      });
    }

    const data =
      await prisma.mataPelajaran.create({
        data: {
          nama,
          kode,
          status,
          sekolahId,
        },
      });

    return res.status(201).json({
      success: true,
      message: "Mata pelajaran berhasil ditambahkan",
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

export const updateMataPelajaran = async (
  req: Request<
    { id: string },
    {},
    Partial<MataPelajaranBody>
  >,
  res: Response
) => {
  try {
    const sekolahId = (req as any).user?.sekolahId;
    const { id } = req.params;

    const existing =
      await prisma.mataPelajaran.findFirst({
        where: {
          id,
          sekolahId,
          dihapusPada: null,
        },
      });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Mata pelajaran tidak ditemukan",
      });
    }

    const { nama, kode, status } = req.body;

    if (kode && kode !== existing.kode) {
      const kodeExist =
        await prisma.mataPelajaran.findFirst({
          where: {
            kode,
            sekolahId,
            id: {
              not: id,
            },
            dihapusPada: null,
          },
        });

      if (kodeExist) {
        return res.status(409).json({
          success: false,
          message: "Kode mata pelajaran sudah digunakan",
        });
      }
    }

    const data =
      await prisma.mataPelajaran.update({
        where: {
          id,
        },
        data: {
          ...(nama && { nama }),
          ...(kode && { kode }),
          ...(status && { status }),
        },
      });

    return res.status(200).json({
      success: true,
      message: "Mata pelajaran berhasil diperbarui",
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

export const deleteMataPelajaran = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const sekolahId = (req as any).user?.sekolahId;
    const { id } = req.params;

    const existing =
      await prisma.mataPelajaran.findFirst({
        where: {
          id,
          sekolahId,
          dihapusPada: null,
        },
      });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Mata pelajaran tidak ditemukan",
      });
    }

    await prisma.mataPelajaran.update({
      where: {
        id,
      },
      data: {
        dihapusPada: new Date(),
      },
    });

    return res.status(200).json({
      success: true,
      message: "Mata pelajaran berhasil dihapus",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
```

## src/controllers/paket.controller.ts

```typescript
import { Request, Response } from "express";
import { prisma } from "../config/db";
import { success } from "zod";

export const createPaket = async (req: Request, res: Response) => {
  try {
    const { nama, deskripsi, harga, durasi, modulIds } = req.body;

    if (!nama || harga === undefined || !durasi) {
      return res.status(400).json({
        success: false,
        message: "Nama, harga, dan durasi harus diisi",
      });
    }

    const paket = await prisma.paket.create({
      data: {
        nama,
        deskripsi,
        harga,
        durasi,
        status: "aktif",

        paketModul: {
          create:
            modulIds.map((modulId: string) => ({
              modulId,
              status: "aktif",
            })) || [],
        },
      },
      include: {
        paketModul: {
          include: {
            modul: true,
          },
        },
      },
    });

    return res.status(201).json({
      success: true,
      message: "Paket berhasil dibuat",
      data: paket,
    });
  } catch (error) {
    console.error("create paket error:", error);
    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat membuat paket",
    });
  }
};

export const getPaketPublic = async (req: Request, res: Response) => {
  try {
    const paket = await prisma.paket.findMany({
      where: {
        status: "aktif",
        dihapusPada: null,
      },
      orderBy: {
        harga: "asc",
      },
      include: {
        paketModul: {
          where: {
            status: "aktif",
            dihapusPada: null,
            modul: {
              status: "aktif",
              dihapusPada: null,
            },
          },
          include: {
            modul: true,
          },
        },
      },
    });

    const data = paket.map((item) => ({
      id: item.id,
      nama: item.nama,
      deskripsi: item.deskripsi,
      harga: item.harga,
      durasi: item.durasi,
      fitur: item.paketModul.map((pm) => ({
        id: pm.modul.id,
        kode: pm.modul.kode,
        nama: pm.modul.nama,
        deskripsi: pm.modul.deskripsi,
        ikon: pm.modul.ikon,
      })),
    }));

    return res.status(200).json({
      success: true,
      message: "Berhasil mendapatkan data paket",
      data,
    });
  } catch (error) {
    console.error("Get paket public error:", error);
    return res.status(500).json({
      success: false,
      message: "Gagal mengambil data paket",
    });
  }
};

export const getPaketPublicById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (typeof id !== "string") {
      return res.status(400).json({
        success: false,
        message: "ID paket tidak valid",
      });
    }

    const paket = await prisma.paket.findFirst({
      where: {
        id,
        status: "aktif",
        dihapusPada: null,
      },
      include: {
        paketModul: {
          where: {
            status: "aktif",
            dihapusPada: null,
            modul: {
              status: "aktif",
              dihapusPada: null,
            },
          },
          include: {
            modul: true,
          },
        },
      },
    });

    if (!paket) {
      return res.status(404).json({
        success: false,
        message: "Paket tidak ditemukan",
      });
    }

    const data = {
      id: paket.id,
      nama: paket.nama,
      deskripsi: paket.deskripsi,
      harga: paket.harga,
      durasi: paket.durasi,
      fitur: paket.paketModul.map((pm) => ({
        id: pm.modul.id,
        kode: pm.modul.kode,
        nama: pm.modul.nama,
        deskripsi: pm.modul.deskripsi,
        ikon: pm.modul.ikon,
      })),
    };

    return res.status(200).json({
      success: true,
      message: "Berhasil mendapatkan data paket",
      data,
    });
  } catch (error) {
    console.error("Get paket public by id error:", error);
    return res.status(500).json({
      success: false,
      message: "Gagal mengambil data paket",
    });
  }
};

export const getFiturPublic = async (req: Request, res: Response) => {
  try {
    const fitur = await prisma.modul.findMany({
      where: {
        status: "aktif",
        dihapusPada: null,
      },
      orderBy: {
        nama: "asc",
      },
      select: {
        id: true,
        kode: true,
        nama: true,
        deskripsi: true,
        ikon: true,
        sistem: true,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Berhasil mendapatkan data fitur",
      data: fitur,
    });
  } catch (error) {
    console.error("Get fitur public error:", error);
    return res.status(500).json({
      success: false,
      message: "Gagal mengambil data fitur",
    });
  }
};

export const updatePaket = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Validasi ID untuk menghilangkan error TypeScript
    if (!id || typeof id !== "string") {
      return res.status(400).json({
        success: false,
        message: "ID paket tidak valid",
      });
    }

    const { nama, deskripsi, harga, durasi, modulIds, status } = req.body;

    const paket = await prisma.paket.update({
      // Paksa TypeScript mengenali ID sebagai string yang valid
      where: { id: String(id) },
      data: {
        nama,
        deskripsi,
        harga,
        durasi,
        status,
        ...(modulIds && {
          paketModul: {
            deleteMany: {}, // Hapus relasi lama
            create: modulIds.map((modulId: string) => ({
              modulId,
              status: "aktif",
            })),
          },
        }),
      },
      include: {
        paketModul: { include: { modul: true } },
      },
    });

    return res.status(200).json({
      success: true,
      message: "Paket berhasil diperbarui",
      data: paket,
    });
  } catch (error) {
    console.error("Update paket error:", error);
    return res.status(500).json({
      success: false,
      message: "Gagal memperbarui paket",
    });
  }
};

export const deletePaket = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Validasi ID untuk menghilangkan error TypeScript
    if (!id || typeof id !== "string") {
      return res.status(400).json({
        success: false,
        message: "ID paket tidak valid",
      });
    }

    // Menggunakan Soft Delete (hanya mengubah status dan tanggal dihapus)
    await prisma.paket.update({
      where: { id: String(id) },
      data: {
        status: "nonaktif",
        dihapusPada: new Date(),
      },
    });

    return res.status(200).json({
      success: true,
      message: "Paket berhasil dinonaktifkan/dihapus",
    });
  } catch (error) {
    console.error("Delete paket error:", error);
    return res.status(500).json({
      success: false,
      message: "Gagal menghapus paket",
    });
  }
};
```

## src/controllers/siswa.controller.ts

```typescript
import { Request, Response, NextFunction } from "express";
import { prisma } from "../config/db";
import { AppError } from "../utils/appError";
import { siswaSchema } from "../validations/akademik.validation";
import bcrypt from "bcrypt";

export const createSiswa = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sekolahId = (req as any).user?.sekolahId;
    if (!sekolahId) throw new AppError("Akses ditolak. Sekolah ID tidak ditemukan.", 403);

    const validatedData = siswaSchema.parse(req.body);
    const { namaLengkap, email, nisn, nis, kelasId } = validatedData;

    // Pastikan email belum terdaftar
    const existingEmail = await prisma.pengguna.findUnique({ where: { email } });
    if (existingEmail) throw new AppError("Email sudah terdaftar", 400);

    // Pastikan NISN belum terdaftar
    const existingNisn = await prisma.pengguna.findFirst({
      where: { nisn, sekolahId }
    });
    if (existingNisn) throw new AppError("NISN sudah terdaftar", 400);

    // Cari peran "siswa"
    const peranSiswa = await prisma.peran.findUnique({ where: { nama: "siswa" } });
    if (!peranSiswa) throw new AppError("Role siswa tidak ditemukan dalam sistem", 500);

    // Hash NISN sebagai default password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(nisn, salt);

    // Gunakan transaksi
    const siswa = await prisma.$transaction(async (tx) => {
      // 1. Buat pengguna
      const newSiswa = await tx.pengguna.create({
        data: {
          namaLengkap,
          email,
          namaPengguna: nisn, // bisa menggunakan NISN sebagai username juga
          kataSandi: hashedPassword,
          nisn,
          nis,
          sekolahId,
          peranId: peranSiswa.id,
        },
      });

      // 2. Jika ada kelasId, masukkan ke AnggotaKelas
      if (kelasId) {
        // Validasi apakah kelas tersebut ada dan milik sekolah ini
        const kelasExists = await tx.kelas.findFirst({
          where: { id: kelasId, sekolahId }
        });
        if (!kelasExists) {
          throw new AppError("Kelas tidak ditemukan atau bukan milik sekolah ini", 404);
        }

        await tx.anggotaKelas.create({
          data: {
            kelasId,
            siswaId: newSiswa.id,
          },
        });
      }

      return newSiswa;
    });

    res.status(201).json({
      success: true,
      message: "Data Siswa berhasil dibuat",
      data: {
        id: siswa.id,
        namaLengkap: siswa.namaLengkap,
        email: siswa.email,
        nisn: siswa.nisn,
      }
    });
  } catch (error) {
    next(error);
  }
};

```

## src/controllers/subscription.controller.ts

```typescript
import { Response, NextFunction } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { prisma } from "../config/db";
import { createPaymentSchema } from "../validations/subscription.validation";
import { successResponse } from "../utils/responseFormatter";
import { AppError } from "../utils/appError";

export const createPayment = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user || !req.user.sekolahId) throw new AppError("Akses Ditolak", 403);

    const data = createPaymentSchema.parse(req.body);
    const paket = await prisma.paket.findUnique({ where: { id: data.paketId } });
    if (!paket) throw new AppError("Paket langganan tidak ditemukan", 404);

    const totalHarga = data.siklusPenagihan === "annual" ? Number(paket.harga) * 12 : Number(paket.harga);

    const pengguna = await prisma.pengguna.findUnique({
      where: { id: req.user.userId },
      select: { namaLengkap: true }
    });
    const namaCustomer = pengguna?.namaLengkap || "Admin Sekolah";

    const midtransAuth = Buffer.from(process.env.MIDTRANS_SERVER_KEY + ":").toString("base64");
    const orderId = `INV-${req.user.sekolahId}-${Date.now()}`;

    const midtransResponse = await fetch("https://app.sandbox.midtrans.com/snap/v1/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Basic ${midtransAuth}`
      },
      body: JSON.stringify({
        transaction_details: { order_id: orderId, gross_amount: totalHarga },
        customer_details: { first_name: namaCustomer, email: req.user.email }
      })
    });

    if (!midtransResponse.ok) {
      const errorData = await midtransResponse.json();
      console.error("Midtrans API Error:", errorData);
      throw new AppError("Gagal memproses pembayaran", 500);
    }

    const snap = await midtransResponse.json();

    await prisma.$transaction(async (tx) => {
      const langganan = await tx.langgananSekolah.create({
        data: {
          sekolahId: req.user!.sekolahId!,
          paketId: paket.id,
          dibuatOleh: req.user!.userId,
          statusPembayaran: "pending",
          statusLangganan: "trialing",
          hargaSaatBerlangganan: totalHarga,
          siklusPenagihan: data.siklusPenagihan,
          midtransOrderId: orderId,
          midtransPaymentLink: snap.redirect_url,
        }
      });

      await tx.riwayatPembayaran.create({
        data: {
          langgananSekolahId: langganan.id,
          sekolahId: req.user!.sekolahId!,
          dibuatOleh: req.user!.userId,
          jumlah: totalHarga,
          status: "pending",
          midtransOrderId: orderId,
        }
      });
    });

    return successResponse(res, "Transaksi Midtrans berhasil dibuat", {
      payment_url: snap.redirect_url,
      token: snap.token
    }, 201);
  } catch (error) {
    next(error);
  }
};


export const getPendingPayments = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user || !req.user.sekolahId) {
      throw new AppError(
        "Akses Ditolak: Anda tidak terhubung dengan sekolah manapun",
        403,
      );
    }

    const pembayaranPending =
      await prisma.riwayatPembayaran.findMany({
        where: {
          sekolahId: req.user.sekolahId,
          status: "pending",
        },

        include: {
          langgananSekolah: {
            include: {
              paket: true,
            },
          },
        },

        orderBy: {
          dibuatPada: "desc",
        },
      });

    return successResponse(
      res,
      "Berhasil mendapatkan riwayat pembayaran",
      pembayaranPending,
      200,
    );
  } catch (error) {
    next(error);
  }
};
```

## src/controllers/tahunAjaran.controller.ts

```typescript
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
```

## src/controllers/tenant.controller.ts

```typescript
import { Request, Response, NextFunction } from "express";
import { prisma } from "../config/db";
import { AppError } from "../utils/appError";
import { successResponse } from "../utils/responseFormatter";
import { tenantOnboardingSchema } from "../validations/tenant.validation";
import bcrypt from "bcryptjs";
import { generateOtp } from "../utils/generateOtp";
import { sendOtpEmail } from "../utils/email";
import crypto from "crypto";

export const registerTenant = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = tenantOnboardingSchema.parse(req.body);

    const existingEmail = await prisma.pengguna.findUnique({ where: { email: validatedData.email } });
    if (existingEmail) throw new AppError("Email sudah terdaftar", 400);

    const existingSubdomain = await prisma.sekolah.findUnique({ where: { subdomain: validatedData.subdomain } });
    if (existingSubdomain) throw new AppError("Subdomain sudah digunakan", 400);

    const paket = await prisma.paket.findUnique({ where: { id: validatedData.paketId } });
    if (!paket) throw new AppError("Paket langganan tidak ditemukan", 400);

    const hashedPassword = await bcrypt.hash(validatedData.kataSandi, 10);
    const otp = generateOtp();

    await prisma.pendaftaranSekolah.create({
      data: {
        nama: validatedData.nama,
        email: validatedData.email,
        kataSandi: hashedPassword,
        namaSekolah: validatedData.namaSekolah,
        jenjang: validatedData.jenjang,
        subdomain: validatedData.subdomain,
        alamatSekolah: validatedData.alamatSekolah,
        teleponSekolah: validatedData.teleponSekolah,
        logo: validatedData.logo ?? null,
        paketId: validatedData.paketId,
        yayasanId: validatedData.yayasanId ?? null,
        kodeOtp: otp,
        otpTimeout: new Date(Date.now() + 5 * 60 * 1000), 
        status: "menunggu_verifikasi",
      },
    });

    await sendOtpEmail({
      email: validatedData.email,
      namaLengkap: validatedData.nama,
      kodeOtp: otp,
    });

    return successResponse(res, "Pendaftaran berhasil. Cek email untuk OTP.", null, 201);
  } catch (error) {
    next(error);
  }
};

export const verifyAndPay = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, kodeOtp } = req.body;
    if (!email || !kodeOtp) throw new AppError("Email dan OTP wajib diisi", 400);

    const pendaftaran = await prisma.pendaftaranSekolah.findFirst({
      where: { email, status: "menunggu_verifikasi" }
    });

    if (!pendaftaran) throw new AppError("Data pendaftaran tidak ditemukan", 404);
    if (pendaftaran.kodeOtp !== kodeOtp) throw new AppError("Kode OTP salah", 400);
    if (pendaftaran.otpTimeout && new Date() > pendaftaran.otpTimeout) {
      throw new AppError("Kode OTP sudah kadaluarsa", 400);
    }

    const paket = await prisma.paket.findUnique({ where: { id: pendaftaran.paketId } });
    if (!paket) throw new AppError("Paket tidak ditemukan", 404);

    if (Number(paket.harga) > 0) {
      const orderId = `REG-${pendaftaran.id.substring(0, 8)}-${Date.now()}`;
      const midtransAuth = Buffer.from(process.env.MIDTRANS_SERVER_KEY + ":").toString("base64");

      const midtransResponse = await fetch("https://app.sandbox.midtrans.com/snap/v1/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Basic ${midtransAuth}`
        },
        body: JSON.stringify({
          transaction_details: { order_id: orderId, gross_amount: Number(paket.harga) },
          customer_details: { first_name: pendaftaran.nama, email: pendaftaran.email }
        })
      });

      if (!midtransResponse.ok) throw new AppError("Gagal membuat pembayaran Midtrans", 500);
      const snap = await midtransResponse.json();

      await prisma.pendaftaranSekolah.update({
        where: { id: pendaftaran.id },
        data: { midtransOrderId: orderId, kodeOtp: null, otpTimeout: null, status: "menunggu_pembayaran" }
      });

      return successResponse(res, "Verifikasi sukses. Silakan bayar.", {
        payment_url: snap.redirect_url,
        is_trial: false
      });
    } 
    else {
      const peranAdmin = await prisma.peran.findUnique({ where: { nama: "admin_sekolah" } });
      if (!peranAdmin) throw new AppError("Sistem bermasalah: Peran admin tidak ditemukan", 500);

      const randomChars = crypto.randomBytes(3).toString("hex").toUpperCase();
      const kodeSekolah = `SCH-${randomChars}`;
      const baseUsername = pendaftaran.email.split("@")[0] || pendaftaran.email;

      await prisma.$transaction(async (tx) => {
        const sekolah = await tx.sekolah.create({
          data: {
            nama: pendaftaran.namaSekolah,
            subdomain: pendaftaran.subdomain,
            kode: kodeSekolah,
            alamat: pendaftaran.alamatSekolah,
            telepon: pendaftaran.teleponSekolah,
            email: pendaftaran.email,
            logo: pendaftaran.logo,
            yayasanId: pendaftaran.yayasanId,
            status: "uji coba",
            konfigurasi: { jenjang: pendaftaran.jenjang }
          }
        });

        const pengguna = await tx.pengguna.create({
          data: {
            namaPengguna: `${baseUsername}_${randomChars.toLowerCase()}`,
            email: pendaftaran.email,
            kataSandi: pendaftaran.kataSandi,
            namaLengkap: pendaftaran.nama,
            sekolahId: sekolah.id,
            peranId: peranAdmin.id,
            status: "aktif"
          }
        });

        const endDate = new Date();
        endDate.setMonth(endDate.getMonth() + 1);

        await tx.langgananSekolah.create({
          data: {
            sekolahId: sekolah.id,
            paketId: paket.id,
            dibuatOleh: pengguna.id,
            statusPembayaran: "success",
            statusLangganan: "trialing",
            hargaSaatBerlangganan: 0,
            siklusPenagihan: "monthly",
            tanggalMulai: new Date(),
            tanggalBerakhir: endDate
          }
        });

        await tx.pendaftaranSekolah.update({
          where: { id: pendaftaran.id },
          data: { status: "selesai", kodeOtp: null, otpTimeout: null }
        });
      });

      return successResponse(res, "Sekolah uji coba berhasil dibuat! Silakan login.", { is_trial: true });
    }
  } catch (error) {
    next(error);
  }
};

```

## src/controllers/user.controller.ts

```typescript
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


```

## src/controllers/webhook.controller.ts

```typescript
import { Request, Response, NextFunction } from "express";
import crypto from "crypto";
import { prisma } from "../config/db";

export const handleMidtransWebhook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { 
      order_id, status_code, gross_amount, signature_key, transaction_status, transaction_id 
    } = req.body;
    
    const serverKey = process.env.MIDTRANS_SERVER_KEY || "";
    const hash = crypto.createHash("sha512").update(order_id + status_code + gross_amount + serverKey).digest("hex");
    
    if (hash !== signature_key) {
      return res.status(403).json({ success: false, message: "Invalid Signature Key" });
    }

    if (order_id.startsWith("REG-")) {
      const pendaftaran = await prisma.pendaftaranSekolah.findFirst({
        where: { midtransOrderId: order_id }
      });

      if (!pendaftaran) return res.status(404).json({ success: false, message: "Pendaftaran not found" });

      if (transaction_status === "capture" || transaction_status === "settlement") {
        const peranAdmin = await prisma.peran.findUnique({ where: { nama: "admin_sekolah" } });
        const randomChars = crypto.randomBytes(3).toString("hex").toUpperCase();
        const kodeSekolah = `SCH-${randomChars}`;
        const baseUsername = pendaftaran.email.split("@")[0] || pendaftaran.email;

        await prisma.$transaction(async (tx) => {
          const sekolah = await tx.sekolah.create({
            data: {
              nama: pendaftaran.namaSekolah,
              subdomain: pendaftaran.subdomain,
              kode: kodeSekolah,
              alamat: pendaftaran.alamatSekolah,
              telepon: pendaftaran.teleponSekolah,
              email: pendaftaran.email,
              logo: pendaftaran.logo,
              yayasanId: pendaftaran.yayasanId,
              status: "aktif",
              konfigurasi: { jenjang: pendaftaran.jenjang }
            }
          });

          const pengguna = await tx.pengguna.create({
            data: {
              namaPengguna: `${baseUsername}_${randomChars.toLowerCase()}`,
              email: pendaftaran.email,
              kataSandi: pendaftaran.kataSandi,
              namaLengkap: pendaftaran.nama,
              sekolahId: sekolah.id,
              peranId: peranAdmin!.id,
              status: "aktif"
            }
          });

          const endDate = new Date();
          endDate.setFullYear(endDate.getFullYear() + 1);

          await tx.langgananSekolah.create({
            data: {
              sekolahId: sekolah.id,
              paketId: pendaftaran.paketId,
              dibuatOleh: pengguna.id,
              statusPembayaran: "success",
              statusLangganan: "active",
              hargaSaatBerlangganan: gross_amount,
              siklusPenagihan: "annual",
              midtransOrderId: order_id,
              tanggalMulai: new Date(),
              tanggalBerakhir: endDate
            }
          });

          await tx.pendaftaranSekolah.update({
            where: { id: pendaftaran.id },
            data: { status: "selesai" }
          });
        });
      } else if (transaction_status === "cancel" || transaction_status === "deny" || transaction_status === "expire") {
        await prisma.pendaftaranSekolah.update({
          where: { id: pendaftaran.id },
          data: { status: "pembayaran_gagal" }
        });
      }
      return res.status(200).json({ received: true });
    }

    if (order_id.startsWith("INV-")) {
      const riwayat = await prisma.riwayatPembayaran.findFirst({
        where: { midtransOrderId: order_id },
        include: { langgananSekolah: true }
      });

      if (!riwayat) return res.status(404).json({ success: false, message: "Order ID not found" });

      await prisma.$transaction(async (tx) => {
        if (transaction_status === "capture" || transaction_status === "settlement") {
          await tx.riwayatPembayaran.update({
            where: { id: riwayat.id },
            data: { status: "success", midtransTransactionId: transaction_id, webhookRawPayload: req.body }
          });

          const startDate = new Date();
          const endDate = new Date();
          if (riwayat.langgananSekolah.siklusPenagihan === "annual") {
            endDate.setFullYear(endDate.getFullYear() + 1);
          } else {
            endDate.setMonth(endDate.getMonth() + 1);
          }

          await tx.langgananSekolah.update({
            where: { id: riwayat.langgananSekolah.id },
            data: {
              statusPembayaran: "success",
              statusLangganan: "active",
              tanggalMulai: startDate,
              tanggalBerakhir: endDate
            }
          });

          await tx.sekolah.update({
            where: { id: riwayat.sekolahId! },
            data: { status: "aktif" }
          });
        } else if (transaction_status === "cancel" || transaction_status === "deny" || transaction_status === "expire") {
          await tx.riwayatPembayaran.update({
            where: { id: riwayat.id },
            data: { status: "failed", midtransTransactionId: transaction_id, webhookRawPayload: req.body }
          });

          await tx.langgananSekolah.update({
            where: { id: riwayat.langgananSekolah.id },
            data: { statusPembayaran: "expired" }
          });
        }
      });
      return res.status(200).json({ received: true });
    }

    return res.status(400).json({ success: false, message: "Format Order ID tidak dikenali" });
  } catch (error) {
    console.error("Midtrans Webhook Error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

```

## src/controllers/yayasan.controller.ts

```typescript
import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { prisma } from "../config/db";
import { successResponse } from "../utils/responseFormatter";

// 1. Mengambil Daftar Sekolah Binaan (Sudah ada, dipertahankan)
export const getSekolahBinaan = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user || !req.user.yayasanId) {
      return res.status(403).json({ success: false, message: "Akses ditolak: Khusus Admin Yayasan" });
    }

    const sekolah = await prisma.sekolah.findMany({
      where: { yayasanId: req.user.yayasanId, dihapusPada: null },
      select: {
        id: true,
        nama: true,
        subdomain: true,
        status: true,
        telepon: true,
        email: true,
        logo: true,
        langgananSekolah: {
          orderBy: { dibuatPada: 'desc' },
          take: 1,
          select: { statusLangganan: true, tanggalBerakhir: true, paket: { select: { nama: true } } }
        }
      },
      orderBy: { dibuatPada: 'desc' }
    });

    return successResponse(res, "Berhasil mengambil data sekolah binaan", sekolah);
  } catch (error) {
    console.error("Error getSekolahBinaan:", error);
    return res.status(500).json({ success: false, message: "Terjadi kesalahan server" });
  }
};

// 2. Metrik Dashboard (Total Sekolah, Status Aktif, dll)
export const getDashboardSummary = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user || !req.user.yayasanId) {
      return res.status(403).json({ success: false, message: "Akses ditolak: Khusus Admin Yayasan" });
    }

    const yayasanId = req.user.yayasanId;

    const totalSekolah = await prisma.sekolah.count({ where: { yayasanId, dihapusPada: null } });
    const sekolahAktif = await prisma.sekolah.count({ where: { yayasanId, status: "aktif", dihapusPada: null } });
    const sekolahUjiCoba = await prisma.sekolah.count({ where: { yayasanId, status: "uji coba", dihapusPada: null } });

    // Hitung total pengguna (Siswa & Guru) di bawah yayasan ini
    const totalPengguna = await prisma.pengguna.count({
      where: {
        sekolah: { yayasanId },
        peran: { nama: { in: ["siswa", "guru"] } },
        dihapusPada: null
      }
    });

    const data = {
      totalSekolah,
      sekolahAktif,
      sekolahUjiCoba,
      totalPenggunaAktif: totalPengguna
    };

    return successResponse(res, "Berhasil mengambil metrik dashboard yayasan", data);
  } catch (error) {
    console.error("Error getDashboardSummary:", error);
    return res.status(500).json({ success: false, message: "Terjadi kesalahan server" });
  }
};

// 3. Melihat Detail Statistik Satu Sekolah (Read-Only)
export const getDetailSekolahBinaan = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user || !req.user.yayasanId) {
      return res.status(403).json({ success: false, message: "Akses ditolak: Khusus Admin Yayasan" });
    }

    const { id } = req.params;
    if (typeof id !== "string") {
      return res.status(400).json({ success: false, message: "ID sekolah tidak valid" });
    }

    // Pastikan sekolah ini benar-benar milik yayasan tersebut
    const sekolah = await prisma.sekolah.findFirst({
      where: { id, yayasanId: req.user.yayasanId, dihapusPada: null },
      include: {
        langgananSekolah: {
          orderBy: { dibuatPada: 'desc' },
          take: 1,
          include: { paket: true }
        }
      }
    });

    if (!sekolah) {
      return res.status(404).json({ success: false, message: "Sekolah tidak ditemukan atau tidak berada di bawah naungan Anda" });
    }

    // Ambil statistik jumlah guru dan siswa di sekolah tersebut
    const totalGuru = await prisma.pengguna.count({
      where: { sekolahId: id, peran: { nama: "guru" }, dihapusPada: null }
    });
    const totalSiswa = await prisma.pengguna.count({
      where: { sekolahId: id, peran: { nama: "siswa" }, dihapusPada: null }
    });
    const totalKelas = await prisma.kelas.count({
      where: { sekolahId: id, dihapusPada: null }
    });

    const data = {
      profil: sekolah,
      statistik: { totalGuru, totalSiswa, totalKelas }
    };

    return successResponse(res, "Berhasil mengambil detail sekolah", data);
  } catch (error) {
    console.error("Error getDetailSekolahBinaan:", error);
    return res.status(500).json({ success: false, message: "Terjadi kesalahan server" });
  }
};

```

## src/middlewares/auth.middleware.ts

```typescript
import { Request, Response, NextFunction } from "express";
import { verifyAccessToken, TokenPayLoad } from "../utils/generateToken";

export interface AuthRequest extends Request {
    user?: TokenPayLoad;
}

export const authenticate = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized token diperlukan"
            });
        }
        if (!authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Format token harus Bearer <token>",
            });
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token tidak ditemukan",
            });
        }

        const decode = verifyAccessToken(token);

        req.user = decode;

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Token tidak valid",
        });
    }
};
```

## src/middlewares/error.middleware.ts

```typescript
import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  if (err instanceof ZodError) {
    statusCode = 400;
    message = err.issues
      .map((e) => `${e.path.join(".")}: ${e.message}`)
      .join(", ");
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

```

## src/middlewares/role.middleware.ts

```typescript
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

      console.log("ROLE DEBUG:");
      console.log("roleId dari token:", req.user.roleId);
      console.log("role dari database:", userRole?.nama);
      console.log("role yang diizinkan:", allowedRoles);

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

```

## src/middlewares/tenant.middleware.ts

```typescript
import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth.middleware";
import { prisma } from "../config/db";

export const requireTenant = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    // 1. Pastikan user sudah login
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // 2. Pastikan user terhubung dengan sekolah
    const sekolahId = req.user.sekolahId;

    if (!sekolahId) {
      return res.status(403).json({
        success: false,
        message:
          "Akses Ditolak: Anda tidak terhubung dengan sekolah manapun",
      });
    }

    // 3. Cari sekolah berdasarkan sekolahId milik user
    const sekolah = await prisma.sekolah.findUnique({
      where: {
        id: sekolahId,
      },
    });

    if (!sekolah) {
      return res.status(404).json({
        success: false,
        message: "Sekolah tidak ditemukan",
      });
    }

    // 4. Cek status sekolah
    if (sekolah.status !== "aktif") {
      return res.status(403).json({
        success: false,
        message: "Akses Ditolak: Sekolah tidak aktif",
      });
    }

    // 5. Cari langganan sekolah
    const langganan = await prisma.langgananSekolah.findFirst({
      where: {
        sekolahId: sekolahId,
      },
      orderBy: {
        dibuatPada: "desc",
      },
    });

    if (!langganan) {
      return res.status(403).json({
        success: false,
        message: "Akses Ditolak: Sekolah belum memiliki langganan",
      });
    }

    // 6. Cek status langganan
    const statusAktif =
      langganan.statusLangganan === "active" ||
      langganan.statusLangganan === "trialing";

    if (!statusAktif) {
      return res.status(403).json({
        success: false,
        message: "Akses Ditolak: Langganan sekolah tidak aktif",
      });
    }

    // 7. Cek tanggal berakhir
    if (
      langganan.tanggalBerakhir &&
      new Date() > new Date(langganan.tanggalBerakhir)
    ) {
      // Update status menjadi expired
      await prisma.langgananSekolah.update({
        where: {
          id: langganan.id,
        },
        data: {
          statusLangganan: "expired",
        },
      });

      return res.status(403).json({
        success: false,
        message: "Akses Ditolak: Masa langganan telah kadaluarsa",
      });
    }

    // 8. Kalau semua valid, lanjut ke controller
    next();
  } catch (error) {
    console.error("Tenant Middleware Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
```

## src/middlewares/validation.middleware.ts

```typescript
import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export const validate = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Data tidak valid",
        errors: result.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      });
    }

    req.body = result.data;

    next();
  };
};
```

## src/routes/akademik.routes.ts

```typescript
import { Router } from "express";
import {
  createTahunAjaran,
  updateTahunAjaran,
  getTahunAjaran,
  createKelas,
  getKelas
} from "../controllers/akademik.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { authorizeRoles } from "../middlewares/role.middleware";
import { requireTenant } from "../middlewares/tenant.middleware";

const router = Router();

router.use(authenticate, requireTenant);

// Tahun Ajaran routes
router.post("/tahun-ajaran", authorizeRoles("admin_sekolah"), createTahunAjaran);
router.put("/tahun-ajaran/:id", authorizeRoles("admin_sekolah"), updateTahunAjaran);
router.get("/tahun-ajaran", getTahunAjaran);

// Kelas routes
router.post("/kelas", authorizeRoles("admin_sekolah"), createKelas);
router.get("/kelas", getKelas);

export default router;

```

## src/routes/auth.routes.ts

```typescript
import { Router } from "express";
import {
  register,
  verifyRegister,
  login,
  verifyLogin,
  forgotPassword,
  resetPassword,
} from "../controllers/auth.controller";

const router = Router();

router.post("/register", register);
router.post("/verify-register", verifyRegister);
router.post("/login", login);
router.post("/verify-login", verifyLogin);

router.post("/lupa-kata-sandi", forgotPassword);
router.post("/atur-ulang-kata-sandi", resetPassword);

export default router;

```

## src/routes/kelas.routes.ts

```typescript
import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validation.middleware";

import {
  createKelas,
  getKelas,
  updateKelas,
  deleteKelas,
} from "../controllers/kelas.controller";

import {
  createKelasSchema,
  updateKelasSchema,
} from "../validations/kelas.Validation";

const router = Router();

router.get(
  "/",
  authenticate,
  getKelas
);

router.post(
  "/",
  authenticate,
  validate(createKelasSchema),
  createKelas
);

router.put(
  "/:id",
  authenticate,
  validate(updateKelasSchema),
  updateKelas
);

router.delete(
  "/:id",
  authenticate,
  deleteKelas
);

export default router;
```

## src/routes/kelasMapel.routes.ts

```typescript
import { Router } from "express";

import {
  getKelasMapel,
  createKelasMapel,
  updateKelasMapel,
  deleteKelasMapel,
} from "../controllers/kelasMapel.controller";

const router = Router();

router.get("/", getKelasMapel);

router.post("/", createKelasMapel);

router.put("/:id", updateKelasMapel);

router.delete("/:id", deleteKelasMapel);

export default router;
```

## src/routes/mataPelajaran.ts

```typescript
import { Router } from "express";

import {
  getMataPelajaran,
  createMataPelajaran,
  updateMataPelajaran,
  deleteMataPelajaran,
} from "../controllers/mataPelajaran.controller";

const router = Router();

router.get("/", getMataPelajaran);

router.post("/", createMataPelajaran);

router.put("/:id", updateMataPelajaran);

router.delete("/:id", deleteMataPelajaran);

export default router;
```

## src/routes/paket.routes.ts

```typescript
import { Router } from "express";
import {
  getPaketPublic,
  getPaketPublicById,
  getFiturPublic,
  createPaket,
  updatePaket,
  deletePaket,
} from "../controllers/paket.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { authorizeRoles } from "../middlewares/role.middleware";

const router = Router();

// PUBLIC ROUTES (Tersedia untuk umum / landing page)
router.get("/fitur/list", getFiturPublic);
router.get("/", getPaketPublic);
router.get("/:id", getPaketPublicById);

// PROTECTED ROUTES (Hanya Super Admin)
router.post("/", authenticate, authorizeRoles("super_admin"), createPaket);
router.put("/:id", authenticate, authorizeRoles("super_admin"), updatePaket);
router.delete("/:id", authenticate, authorizeRoles("super_admin"), deletePaket);

export default router;

```

## src/routes/siswa.routes.ts

```typescript
import { Router } from "express";
import { createSiswa } from "../controllers/siswa.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { authorizeRoles } from "../middlewares/role.middleware";
import { requireTenant } from "../middlewares/tenant.middleware";

const router = Router();

router.use(authenticate, requireTenant);

// Siswa routes
router.post("/", authorizeRoles("admin_sekolah"), createSiswa);

export default router;

```

## src/routes/subscription.routes.ts

```typescript
import { Router } from "express";
import { createPayment } from "../controllers/subscription.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { requireTenant } from "../middlewares/tenant.middleware";
import { authorizeRoles } from "../middlewares/role.middleware";
import { getPendingPayments } from "../controllers/subscription.controller";

const router = Router();

// Endpoint ini hanya boleh diakses oleh admin sekolah
router.post(
  "/bayar",
  authenticate,
  requireTenant,
  authorizeRoles("admin_sekolah"),
  createPayment,
);

router.get(
  "/pending",
  authenticate,
  requireTenant,
  authorizeRoles("admin_sekolah"),
  getPendingPayments,
);

export default router;

```

## src/routes/tahunAjaran.routes.ts

```typescript
import { Router } from "express";

import {
  getTahunAjaran,
  createTahunAjaran,
  updateTahunAjaran,
  deleteTahunAjaran,
} from "../controllers/tahunAjaran.controller";

const router = Router();

router.get("/", getTahunAjaran);

router.post("/", createTahunAjaran);

router.put("/:id", updateTahunAjaran);

router.delete("/:id", deleteTahunAjaran);

export default router;
```

## src/routes/tenant.routes.ts

```typescript
import { Router } from "express";
import { registerTenant, verifyAndPay } from "../controllers/tenant.controller";

const router = Router();

router.post("/register", registerTenant);
router.post("/verify", verifyAndPay);

export default router;

```

## src/routes/user.routes.ts

```typescript
import { Router } from "express";

import {
  profile,
  updateProfile,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller";

import { authenticate } from "../middlewares/auth.middleware";
import { requireTenant } from "../middlewares/tenant.middleware";
import { authorizeRoles } from "../middlewares/role.middleware";

const router = Router();

// PROFILE
router.get(
  "/profile",
  authenticate,
  requireTenant,
  profile
);

router.put(
  "/profile",
  authenticate,
  requireTenant,
  updateProfile
);

// CRUD PENGGUNA - SUPERADMIN
router.get(
  "/",
  authenticate,
  authorizeRoles("super_admin"),
  getUsers
);

router.post(
  "/",
  authenticate,
  authorizeRoles("super_admin"),
  createUser
);

router.put(
  "/:id",
  authenticate,
  authorizeRoles("super_admin"),
  updateUser
);

router.delete(
  "/:id",
  authenticate,
  authorizeRoles("super_admin"),
  deleteUser
);

export default router;
```

## src/routes/webhook.routes.ts

```typescript
import { Router } from "express";
import { handleMidtransWebhook } from "../controllers/webhook.controller";

const router = Router();

// Endpoint ini dipanggil otomatis oleh Midtrans, jangan dipasang auth middleware
router.post("/midtrans", handleMidtransWebhook);

export default router;

```

## src/routes/yayasan.routes.ts

```typescript
import { Router } from "express";
import { 
  getSekolahBinaan, 
  getDashboardSummary, 
  getDetailSekolahBinaan 
} from "../controllers/yayasan.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { authorizeRoles } from "../middlewares/role.middleware";

const router = Router();

// Semua rute di bawah ini HANYA boleh diakses oleh admin_yayasan
router.use(authenticate, authorizeRoles("admin_yayasan"));

router.get("/summary", getDashboardSummary); // Metrik Dashboard (Kartu-kartu atas)
router.get("/sekolah", getSekolahBinaan);    // Tabel daftar sekolah binaan
router.get("/sekolah/:id", getDetailSekolahBinaan); // Detail satu sekolah

export default router;

```

## src/server.ts

```typescript
import app from "./app";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`=================================`);
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🔗 URL: http://localhost:${PORT}`);
  console.log(`=================================`);
});

```

## src/utils/appError.ts

```typescript
export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

```

## src/utils/email.ts

```typescript
import { Resend } from "resend";
import process from "node:process";

let resendInstance: Resend | null = null;

const getResend = () => {
  if (!resendInstance) {
    if (!process.env.RESEND_API_KEY) {
      console.warn("RESEND_API_KEY is not set!");
    }
    resendInstance = new Resend(process.env.RESEND_API_KEY);
  }
  return resendInstance;
};

interface SendOtpParams {
  email: string;
  namaLengkap: string;
  kodeOtp: string;
}

/**
 * Utility untuk mengirimkan email kode OTP verifikasi menggunakan Resend API
 */
export async function sendOtpEmail({
  email,
  namaLengkap,
  kodeOtp,
}: SendOtpParams): Promise<boolean> {
  try {
    const from =
      process.env.EMAIL_FROM || "SmartSchool <onboarding@resend.dev>";

    const response = await getResend().emails.send({
      from: from,
      to: [email],
      subject: `[SmartSchool] Kode OTP Verifikasi Anda: ${kodeOtp}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #1a56db; text-align: center;">SmartSchool Digital Ecosystem</h2>
          <hr style="border: 0; border-top: 1px solid #eee;" />
          <p>Halo <strong>${namaLengkap}</strong>,</p>
          <p>Terima kasih telah menggunakan layanan SmartSchool. Gunakan kode OTP di bawah ini untuk memverifikasi akun atau mengatur ulang kata sandi Anda:</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <span style="font-size: 32px; font-weight: bold; letter-spacing: 6px; color: #1a56db; background: #f0f5ff; padding: 12px 24px; border-radius: 6px; display: inline-block;">
              ${kodeOtp}
            </span>
          </div>
          
          <p style="color: #666; font-size: 14px;">Kode OTP ini berlaku selama <strong>5 menit</strong>. Jangan berikan kode ini kepada siapapun demi keamanan akun Anda.</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin-top: 30px;" />
          <p style="font-size: 12px; color: #999; text-align: center;">Email ini dikirimkan secara otomatis oleh sistem SmartSchool. Mohon untuk tidak membalas email ini.</p>
        </div>
      `,
    });

    if (response.error) {
      console.error("❌ Gagal mengirim email via Resend:", response.error);
      return false;
    }

    console.log(
      `✅ Email OTP berhasil dikirim ke ${email} (ID: ${response.data?.id})`,
    );
    return true;
  } catch (error) {
    console.error("❌ Terjadi kesalahan pada email service:", error);
    return false;
  }
}

```

## src/utils/generateOtp.ts

```typescript
/*Generate 6 digit numeric OTP */
export const generateOtp = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

```

## src/utils/generateToken.ts

```typescript
import jwt from "jsonwebtoken";

export interface TokenPayLoad {
    userId: string;
    email: string;
    roleId?: string;
    role?: string;
    sekolahId?: string;
    yayasanId?: string;
}

export interface RefreshPayLoad {
    userId: string;
    type: "refresh";
}

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET belum diatur!");
}

export const generateAccessToken = (
    payload: TokenPayLoad
): string => {
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: "3h",
    });
};

export const generateRefreshToken = (
    payload: RefreshPayLoad
): string => {
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: "7d",
    });
};

export const verifyAccessToken = (
    token: string
): TokenPayLoad => {
    return jwt.verify(
        token, 
        JWT_SECRET
    ) as TokenPayLoad;
};

export const verifyRefreshToken = (
    token: string
): RefreshPayLoad => {
    return jwt.verify(
        token, 
        JWT_SECRET
    ) as RefreshPayLoad;
};
```

## src/utils/responseFormatter.ts

```typescript
import { Response } from "express";

export const successResponse = (
  res: Response,
  message: string,
  data: any = null,
  statusCode = 200,
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

export const paginatedResponse = (
  res: Response,
  message: string,
  data: any[],
  page: number,
  limit: number,
  totalData: number,
  statusCode = 200,
) => {
  const totalPages = Math.ceil(totalData / limit);
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    meta: {
      page,
      limit,
      totalData,
      totalPages,
    },
  });
};

```

## src/validations/akademik.validation.ts

```typescript
import { z } from "zod";

export const tahunAjaranSchema = z.object({
  nama: z.string().min(4, "Nama tahun ajaran wajib diisi (contoh: 2026/2027)"),
  semester: z.enum(["Ganjil", "Genap"]),
  status: z.enum(["aktif", "tidak_aktif"]).default("tidak_aktif"),
});

export const kelasSchema = z.object({
  nama: z.string().min(2, "Nama kelas wajib diisi"),
  tingkat: z.number().int().positive("Tingkat harus berupa angka positif"),
  tahunAjaranId: z.string().uuid("ID Tahun Ajaran tidak valid"),
  waliKelasId: z.string().uuid("ID Wali Kelas tidak valid").optional().nullable(),
});

export const siswaSchema = z.object({
  namaLengkap: z.string().min(3, "Nama lengkap wajib diisi"),
  email: z.string().email("Format email tidak valid"),
  nisn: z.string().min(5, "NISN wajib diisi"),
  nis: z.string().optional(),
  kelasId: z.string().uuid("ID Kelas tidak valid").optional(),
});

```

## src/validations/auth.validation.ts

```typescript
import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email("Format email tidak valid"),
  namaPengguna: z
    .string()
    .min(3, "Username minimal 3 karakter")
    .max(50, "Username maksimal 50 karakter")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username hanya boleh huruf, angka, dan underscore",
    ),
  namaLengkap: z.string().min(3, "Nama lengkap minimal 3 karakter"),
  kataSandi: z
    .string()
    .min(8, "Kata sandi minimal 8 karakter")
    .regex(/[A-Z]/, "Kata sandi harus mengandung minimal 1 huruf kapital")
    .regex(/[0-9]/, "Kata sandi harus mengandung minimal 1 angka"),
});

export const verifySchema = z.object({
  email: z.string().email("Format email tidak valid"),
  kodeOtp: z.string().length(6, "Kode OTP harus terdiri dari 6 digit"),
});

export const loginSchema = z.object({
  identifier: z.string().min(1, "Email atau username harus diisi"),
  kataSandi: z.string().min(1, "Kata sandi harus diisi"),
});

export const verifyLoginSchema = z.object({
  identifier: z.string().min(1, "Email atau username harus diisi"),
  kodeOtp: z.string().length(6, "Kode OTP harus terdiri dari 6 digit"),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email("Format email tidak valid"),
});

export const resetPasswordSchema = z.object({
  email: z.string().email("Format email tidak valid"),
  kodeOtp: z.string().length(6, "Kode OTP harus terdiri dari 6 digit"),
  kataSandi: z
    .string()
    .min(8, "Kata sandi minimal 8 karakter")
    .regex(/[A-Z]/, "Kata sandi harus mengandung minimal 1 huruf kapital")
    .regex(/[0-9]/, "Kata sandi harus mengandung minimal 1 angka"),
})
```

## src/validations/kelas.Validation.ts

```typescript
import { z } from "zod";

export const createKelasSchema = z.object({
  nama: z
    .string()
    .min(1, "Nama kelas wajib diisi")
    .max(50, "Nama kelas maksimal 50 karakter"),

  tingkat: z
    .number({
      message: "Tingkat harus berupa angka",
    })
    .int("Tingkat harus berupa angka bulat"),

  tahunAjaranId: z
    .string()
    .uuid("ID tahun ajaran tidak valid"),

  waliKelasId: z
    .string()
    .uuid("ID wali kelas tidak valid")
    .optional(),
});

export const updateKelasSchema = z.object({
  nama: z
    .string()
    .min(1, "Nama kelas tidak boleh kosong")
    .max(50, "Nama kelas maksimal 50 karakter")
    .optional(),

  tingkat: z
    .number({
      message: "Tingkat harus berupa angka",
    })
    .int("Tingkat harus berupa angka bulat")
    .optional(),

  tahunAjaranId: z
    .string()
    .uuid("ID tahun ajaran tidak valid")
    .optional(),

  waliKelasId: z
    .string()
    .uuid("ID wali kelas tidak valid")
    .nullable()
    .optional(),
});
```

## src/validations/kelasMapel.validation.ts

```typescript
import { z } from "zod";

export const createKelasMapelSchema = z.object({
  kelasId: z
    .string()
    .uuid("ID kelas tidak valid"),

  mataPelajaranId: z
    .string()
    .uuid("ID mata pelajaran tidak valid"),

  guruPengajarId: z
    .string()
    .uuid("ID guru pengajar tidak valid"),

  status: z
    .string()
    .max(20, "Status maksimal 20 karakter")
    .optional(),
});

export const updateKelasMapelSchema = z.object({
  kelasId: z
    .string()
    .uuid("ID kelas tidak valid")
    .optional(),

  mataPelajaranId: z
    .string()
    .uuid("ID mata pelajaran tidak valid")
    .optional(),

  guruPengajarId: z
    .string()
    .uuid("ID guru pengajar tidak valid")
    .optional(),

  status: z
    .string()
    .max(20, "Status maksimal 20 karakter")
    .optional(),
});
```

## src/validations/mataPelajaran.validation.ts

```typescript
import { z } from "zod";

export const createMataPelajaranSchema = z.object({
  nama: z
    .string()
    .min(1, "Nama mata pelajaran wajib diisi")
    .max(100, "Nama mata pelajaran maksimal 100 karakter"),

  kode: z
    .string()
    .min(1, "Kode mata pelajaran wajib diisi")
    .max(20, "Kode mata pelajaran maksimal 20 karakter"),

  status: z
    .string()
    .max(20, "Status maksimal 20 karakter")
    .optional(),
});

export const updateMataPelajaranSchema = z.object({
  nama: z
    .string()
    .min(1, "Nama mata pelajaran tidak boleh kosong")
    .max(100, "Nama mata pelajaran maksimal 100 karakter")
    .optional(),

  kode: z
    .string()
    .min(1, "Kode mata pelajaran tidak boleh kosong")
    .max(20, "Kode mata pelajaran maksimal 20 karakter")
    .optional(),

  status: z
    .string()
    .max(20, "Status maksimal 20 karakter")
    .optional(),
});
```

## src/validations/subscription.validation.ts

```typescript
import { z } from "zod";

export const createPaymentSchema = z.object({
  paketId: z.string().uuid("ID Paket tidak valid"),
  siklusPenagihan: z.enum(["monthly", "annual"], {
    error: (issue) =>
      issue.input === undefined
        ? "Siklus penagihan wajib diisi"
        : "Siklus penagihan harus 'monthly' atau 'annual'",
  }),
});

```

## src/validations/tahunAjaran.validation.ts

```typescript
import { z } from "zod";

export const createTahunAjaranSchema = z.object({
  nama: z
    .string()
    .regex(
      /^\d{4}\/\d{4}$/,
      "Format tahun ajaran harus seperti 2026/2027"
    ),

  semester: z.enum(
    ["Ganjil", "Genap"],
    {
      message: "Semester harus Ganjil atau Genap",
    }
  ),

  status: z
    .enum(["aktif", "tidak_aktif"], {
      message: "Status harus aktif atau tidak_aktif",
    })
    .optional(),
});

export const updateTahunAjaranSchema = z.object({
  nama: z
    .string()
    .regex(
      /^\d{4}\/\d{4}$/,
      "Format tahun ajaran harus seperti 2026/2027"
    )
    .optional(),

  semester: z
    .enum(["Ganjil", "Genap"], {
      message: "Semester harus Ganjil atau Genap",
    })
    .optional(),

  status: z
    .enum(["aktif", "tidak_aktif"], {
      message: "Status harus aktif atau tidak_aktif",
    })
    .optional(),
});
```

## src/validations/tenant.validation.ts

```typescript
import { z } from "zod";

const JENJANG_OPTIONS = ["SD", "SMP", "SMA", "SMK", "SLB", "Lainnya"] as const;

export const tenantOnboardingSchema = z.object({
  nama: z.string().min(3, "Nama admin minimal 3 karakter"),
  email: z.string().email("Format email tidak valid"),
  namaSekolah: z.string().min(3, "Nama sekolah minimal 3 karakter"),
  jenjang: z.enum(["SD", "SMP", "SMA", "SMK", "SLB", "Lainnya"]),
  subdomain: z
    .string()
    .min(3, "Subdomain minimal 3 karakter")
    .regex(/^[a-z0-9-]+$/, "Subdomain hanya boleh huruf kecil, angka, dan strip"),
  alamatSekolah: z.string().min(5, "Alamat sekolah minimal 5 karakter"),
  teleponSekolah: z.string().min(8, "Nomor telepon tidak valid"),
  kataSandi: z
    .string()
    .min(8, "Kata sandi minimal 8 karakter")
    .regex(/[A-Z]/, "Kata sandi harus mengandung minimal 1 huruf kapital")
    .regex(/[0-9]/, "Kata sandi harus mengandung minimal 1 angka"),
  logo: z.string().url("Format URL logo tidak valid").optional(),
  paketId: z.string().uuid("ID Paket tidak valid"),
  yayasanId: z.string().uuid("ID Yayasan tidak valid").optional(),
});

```

