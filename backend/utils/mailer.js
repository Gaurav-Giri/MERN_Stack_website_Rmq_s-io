// const nodemailer = require('nodemailer');
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendOTPEmail = async (email, otp) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP for Login',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3498db;">OTP Verification</h2>
          <p>Your one-time password (OTP) for login is:</p>
          <h3 style="background: #f5f5f5; padding: 10px; display: inline-block; border-radius: 4px;">${otp}</h3>
          <p>This OTP is valid for 5 minutes only.</p>
          <p>If you didn't request this, please ignore this email.</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

// module.exports = { sendOTPEmail };
export default sendOTPEmail;
