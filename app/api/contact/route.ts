import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    // Check if credentials are missing or default placeholders
    if (!smtpUser || !smtpPass || smtpUser === "example@gmail.com" || smtpPass === "your_app_password") {
      console.warn("⚠️ SMTP credentials not configured in .env.local");
      return NextResponse.json(
        {
          success: false,
          error: "Gmail credentials not configured. Please add valid SMTP_USER and SMTP_PASS (Gmail App Password) in .env.local",
        },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    await transporter.sendMail({
      from: smtpUser,
      replyTo: email,
      to: smtpUser,
      subject: `📩 ${subject} (from ${name})`,
      html: `
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b></p>
        <p>${message}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Email send error:", error);
    let errorMessage = "Failed to send email. Please check your SMTP configuration.";
    if (error?.code === "EAUTH" || error?.responseCode === 535) {
      errorMessage = "Invalid Gmail login credentials. Please ensure 2FA is enabled and use a 16-character App Password.";
    }
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
