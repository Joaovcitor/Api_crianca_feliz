const nodemailer = require("nodemailer");
require("dotenv").config();

const trasporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.PASS_USER,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports = trasporter;
