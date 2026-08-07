# Dokumentasi Struktur Proyek SmartSchool Backend

Dokumen ini menjelaskan fungsi dari masing-masing folder dan file di dalam proyek **SmartSchool Backend**, beserta cara kerja fitur-fitur di dalamnya. Arsitektur proyek ini dirancang dengan pola **MVC (Model-View-Controller)** yang dimodifikasi untuk API (tanpa View), sehingga memisahkan antara _Routing_, _Bisnis Logic_ (Controller), _Validasi_, dan _Konfigurasi Database_.

---

## 📂 `prisma/`
Folder ini berisi semua hal yang berkaitan dengan *Database ORM (Object-Relational Mapping)* menggunakan Prisma.

- **`schema.prisma`**: 
  - **Fungsi**: File paling utama untuk mendefinisikan skema database. Semua tabel (seperti `Pengguna`, `Siswa`, `Guru`, dll) dan relasi antar tabel didefinisikan di sini. 
  - **Cara Kerja**: Saat Anda menjalankan `npx prisma db push`, Prisma akan membaca file ini dan menerjemahkannya menjadi tabel di PostgreSQL. File ini juga mendefinisikan kolom `kode_otp` dan `otp_timeout` untuk fitur autentikasi.
- **`seed.ts`**: 
  - **Fungsi**: Digunakan untuk mengisi _dummy data_ (data awal) ke dalam database secara otomatis.
  - **Cara Kerja**: Anda menjalankannya dengan perintah `npx prisma db seed`. Skrip ini akan memasukkan data peran (_Role_), sekolah dasar, dan akun Admin pertama ke dalam database agar aplikasi bisa langsung digunakan setelah diinstal.

---

## 📂 `src/config/`
Folder ini digunakan untuk menyimpan pengaturan inti (konfigurasi) aplikasi.

- **`db.ts`**:
  - **Fungsi**: Menyiapkan dan mengekspor koneksi _Prisma Client_ agar dapat digunakan di seluruh aplikasi.
  - **Cara Kerja**: File ini membaca koneksi dari `.env` (`DATABASE_URL`), lalu membuat satu *instance* (singleton) Prisma. Semua Controller yang membutuhkan akses database akan mengimpor `prisma` dari file ini, mencegah aplikasi membuka terlalu banyak koneksi ke database.

---

## 📂 `src/controllers/`
Folder ini merupakan **Otak** dari aplikasi. Di sinilah logika bisnis (Business Logic) berada.

- **`auth.controller.ts`**:
  - **Fungsi**: Mengatur semua proses pendaftaran (Register), masuk (Login), dan verifikasi OTP pengguna.
  - **Cara Kerja**: 
    1. Menerima data (contoh: email & password) dari pengguna via Routes.
    2. Melempar data tersebut ke *Zod Validation* untuk dicek apakah sesuai aturan.
    3. Mengecek ketersediaan email/username di database (Prisma).
    4. Mengenkripsi _password_ menggunakan `bcryptjs`.
    5. Men-generate OTP menggunakan `generateOtp.ts` dan menyimpannya di DB dengan batas waktu.
    6. Mengirim OTP ke email pengguna melalui `email.ts` (Resend).
    7. Untuk fungsi Verifikasi, akan mengecek apakah kode OTP cocok dan belum kedaluwarsa. Jika sukses, ia akan menerbitkan Token JWT yang menandakan pengguna telah sah masuk.

---

## 📂 `src/middlewares/`
Middleware adalah fungsi yang berjalan "di tengah-tengah" sebelum *request* mencapai *Controller* atau sebelum *response* dikembalikan ke *Client*.

- **`error.middleware.ts`**:
  - **Fungsi**: Penangkap error global (Global Error Handler).
  - **Cara Kerja**: Jika terjadi *error* di mana pun di dalam aplikasi (misal: Zod gagal validasi input, atau `AppError` dipicu dari Controller karena password salah), error tersebut akan otomatis ditangkap oleh file ini. Middleware ini akan merapikan pesan *error* tersebut menjadi respons JSON standar (memiliki `success: false` dan `message`) agar format error yang dikembalikan ke Front-End selalu konsisten.

---

## 📂 `src/routes/`
Berisi definisi alamat URL (_Endpoint_) API yang menghubungkan _Client_ dengan _Controller_.

- **`auth.routes.ts`**:
  - **Fungsi**: Mendaftarkan URL untuk fitur autentikasi.
  - **Cara Kerja**: Jika Front-End melakukan *request* ke `POST /register`, router ini akan menangkap *request* tersebut dan mengarahkannya ke fungsi `register` di `auth.controller.ts`.

---

## 📂 `src/utils/`
Folder untuk fungsi-fungsi bantuan (_helper_) kecil yang sering dipakai berulang kali.

- **`appError.ts`**:
  - **Fungsi**: Membuat _class_ Error kustom bernama `AppError`.
  - **Cara Kerja**: Digunakan di *Controller* saat ingin menghentikan proses secara paksa. Contoh: `throw new AppError("Kode OTP Salah", 401)`. Ini lebih rapi daripada sekadar melempar Error biasa karena kita bisa menyisipkan _HTTP Status Code_ (400, 401, 404, dll).
- **`email.ts`**:
  - **Fungsi**: Jembatan penghubung ke layanan Resend.
  - **Cara Kerja**: Memiliki fungsi `sendOtpEmail`. Ia akan menerima alamat email, nama lengkap, dan kode OTP, lalu membungkusnya menjadi template HTML yang rapi, dan menembakkannya ke API Resend agar dikirim ke _inbox_ pengguna.
- **`generateOtp.ts`**:
  - **Fungsi**: Mencetak angka acak.
  - **Cara Kerja**: Menggunakan fungsi matematika JavaScript bawaan (`Math.random()`) untuk menghasilkan persis 6 digit angka secara acak untuk keperluan OTP.
- **`responseFormatter.ts`**:
  - **Fungsi**: Menstandarkan format respons API sukses.
  - **Cara Kerja**: Memastikan bahwa setiap respons sukses memiliki format JSON yang serupa: `{ success: true, message: "...", data: {...} }`.

---

## 📂 `src/validations/`
Berisi aturan main (_Schema_) untuk memastikan keamanan dan ketepatan data yang masuk.

- **`auth.validation.ts`**:
  - **Fungsi**: Menyimpan skema validasi menggunakan _Zod_ untuk Register dan Login.
  - **Cara Kerja**: Mendefinisikan bahwa `kataSandi` harus minimal 8 karakter, wajib ada huruf kapital, dan angka. Mendefinisikan bahwa `kodeOtp` wajib tepat 6 karakter. Saat *Controller* memanggil `parse(req.body)`, Zod akan mengeksekusi aturan ini. Jika melanggar, Zod akan *throw error* yang langsung dicegat oleh `error.middleware.ts`.

---

## 📄 File Root (Inti Aplikasi)

- **`src/app.ts`**:
  - **Fungsi**: Konfigurasi inti framework Express.js.
  - **Cara Kerja**: Mengaktifkan penerimaan JSON (`express.json()`), mengaktifkan CORS (agar API bisa diakses Front-End), dan mendaftarkan semua _Routes_ (misal: `app.use("/api/auth", authRoutes)`). Terakhir, ia menempelkan _Error Middleware_ di bagian paling bawah.
- **`src/server.ts`**:
  - **Fungsi**: Titik awal (*Entry Point*) berjalannya aplikasi.
  - **Cara Kerja**: Pertama kali dijalankan, ia akan memuat `.env` menggunakan `dotenv.config()`, mengimpor `app.ts`, dan mulai "mendengarkan" (_listen_) pada port yang ditentukan (Port 5000).

---

## 🔄 Rangkuman Alur Kerja Aplikasi (Contoh: Login)
1. **[Client]** menekan tombol Login di web, mengirim POST ke `http://localhost:5000/api/auth/login`.
2. **[Server]** `server.ts` hidup, meneruskan request ke `app.ts`.
3. **[App]** `app.ts` melihat awalan `/api/auth`, jadi diteruskan ke `auth.routes.ts`.
4. **[Router]** `auth.routes.ts` melihat ada `/login`, lalu memanggil fungsi `login` di `auth.controller.ts`.
5. **[Controller]** menggunakan `auth.validation.ts` untuk memastikan input terisi.
6. **[Controller]** bertanya ke `db.ts` (Prisma) apakah akun ada dan aktif.
7. **[Controller]** mencocokkan password dengan `bcryptjs`.
8. **[Controller]** memanggil `generateOtp.ts` untuk kode baru, dan menyimpannya ke database via Prisma.
9. **[Controller]** memanggil `email.ts` untuk mengirim OTP ke email.
10. **[Controller]** mengembalikan respons JSON "Silakan cek email".
11. Jika terjadi error di mana saja pada langkah 5-9, **[Middleware]** `error.middleware.ts` akan mencegatnya dan membalas *Client* dengan pesan error yang rapi.
