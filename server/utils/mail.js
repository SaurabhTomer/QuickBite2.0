import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config()


//transporter
const transporter = nodemailer.createTransport({
  service: "Gmail",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});


//send otp mail
export const sendOtpMail = async (to, otp) => {
  await transporter.sendMail({
    from: `"QuickBite Support" <${process.env.EMAIL}>`,
    to,
    subject: "Reset Your Password",
    html: `
      <div style="
        font-family: Arial, Helvetica, sans-serif;
        background-color: #f4f6f8;
        padding: 30px;
      ">
        <div style="
          max-width: 500px;
          margin: auto;
          background: #ffffff;
          border-radius: 8px;
          padding: 25px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        ">
          <h2 style="
            text-align: center;
            color: #ff4d2d;
            margin-bottom: 10px;
          ">
            Password Reset
          </h2>

          <p style="color: #333; font-size: 15px;">
            Hello,
          </p>

          <p style="color: #555; font-size: 14px; line-height: 1.6;">
            You requested to reset your password. Please use the OTP below to
            continue. This OTP is valid for <b>5 minutes</b>.
          </p>

          <div style="
            text-align: center;
            margin: 25px 0;
          ">
            <span style="
              display: inline-block;
              background-color: #ff4d2d;
              color: #ffffff;
              font-size: 22px;
              font-weight: bold;
              letter-spacing: 4px;
              padding: 12px 24px;
              border-radius: 6px;
            ">
              ${otp}
            </span>
          </div>

          <p style="color: #777; font-size: 13px;">
            If you did not request this, please ignore this email.
          </p>

          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />

          <p style="
            text-align: center;
            color: #999;
            font-size: 12px;
          ">
            © ${new Date().getFullYear()} QuickBite. All rights reserved.
          </p>
        </div>
      </div>
    `,
  });
};

