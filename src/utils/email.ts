import { Resend } from "resend";

// Inisialisasi Resend (Pastikan RESEND_API_KEY ada di .env)
const resend = new Resend(process.env.RESEND_API_KEY);

interface SendOtpParams {
  email: string;
  namaLengkap: string;
  kodeOtp: string;
}

export const sendOtpEmail = async ({
  email,
  namaLengkap,
  kodeOtp,
}: SendOtpParams) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "SmartSchool <onboarding@resend.dev>", // Nanti ganti dengan domain kamu kalau sudah beli domain
      to: email, // <-- KUNCI DINAMISNYA ADA DI SINI
      subject: "Kode OTP Verifikasi SmartSchool",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2>Halo, ${namaLengkap}!</h2>
          <p>Gunakan kode OTP berikut untuk melanjutkan proses di SmartSchool. Kode ini berlaku selama 5 menit.</p>
          <h1 style="color: #4F46E5; letter-spacing: 2px;">${kodeOtp}</h1>
          <p>Jika Anda tidak merasa meminta kode ini, abaikan email ini.</p>
        </div>
      `,
    });

    if (error) {
      console.error("Error dari Resend:", error);
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error("Gagal mengeksekusi pengiriman email:", error);
    // Tidak di-throw AppError di sini agar tidak crash, tapi di-log
    return null;
  }
};
