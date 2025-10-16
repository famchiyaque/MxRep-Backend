import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail", // or "Outlook", "Yahoo", etc.
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const mailOptions = {
  from: `"TecBooks" <${process.env.EMAIL_USER}>`,
  to: email,
  subject: "Verify your TecBooks account",
  html: `<a href="${verifyLink}">Click to verify your email</a>`
};

await transporter.sendMail(mailOptions);
