import { Resend } from "resend";
import process from "node:process";

const resend = new Resend(process.env.RESEND_API_KEY);

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

    const response = await resend.emails.send({
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
