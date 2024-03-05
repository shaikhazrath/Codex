import nodemailer from "nodemailer";
import jsonwebtoken from "jsonwebtoken";

export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const sendOTP = async (email, data, subjet) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.NODEMAIL_EMAIL,
      pass: process.env.NODEMAIL_PASSWORD,
    },
  });
  await transporter.sendMail({
    from: "hazrathali128@gmail.com",
    to: email,
    subject: subjet,
    text: `Your OTP  is: ${data}`,
  });
};

export const generateJwt = (id) => {
  const token = jsonwebtoken.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "255h",
  });
  return token;
};
