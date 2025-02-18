const transporter = require("./transporterNodemailer");

const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `<${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });
    return info;
  } catch (e) {
    console.log(e);
    throw new Error("Falha ao enviar e-mail");
  }
};

module.exports = sendEmail;
