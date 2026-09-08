import nodemailer from "nodemailer";
import { google } from "googleapis";

// Pastikan TypeScript membaca env sebagai string
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET as string;
const REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN as string;
const SENDER_EMAIL = process.env.GOOGLE_SENDER_EMAIL as string;

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  "https://developers.google.com/oauthplayground",
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

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
    const accessTokenResponse = await oAuth2Client.getAccessToken();
    const accessToken = accessTokenResponse.token as string;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: SENDER_EMAIL,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: `SmartSchool <${SENDER_EMAIL}>`,
      to: email, // <-- Menggunakan parameter dari interface
      subject: "Kode OTP Verifikasi SmartSchool",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2>Halo, ${namaLengkap}!</h2>
          <p>Gunakan kode OTP berikut untuk melanjutkan proses di SmartSchool. Kode ini berlaku selama 5 menit.</p>
          <h1 style="color: #4F46E5; letter-spacing: 2px;">${kodeOtp}</h1>
          <p>Jika Anda tidak merasa meminta kode ini, abaikan email ini.</p>
        </div>
      `,
    };

    const data = await transporter.sendMail(mailOptions);
    return data;
  } catch (error) {
    console.error("Gagal mengeksekusi pengiriman email:", error);
    return null;
  }
};
