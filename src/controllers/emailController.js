const User = require("../models/Users");
const sendEmail = require("../services/emails/sendEmail");
const jwt = require("jsonwebtoken");

module.exports = class EmailController {
  static async resetPassword(req, res) {
    const { email } = req.body;

    try {
      const user = await User.findOne({ where: { email: email } });
      if (!user) {
        return res.status(400).json({ errors: "Usuário não encontrado!" });
      }

      const resetToken = jwt.sign(
        { id: user.id, email: user.email },
        process.env.SECRET_JWT,
        { expiresIn: "1h" }
      );

      const resetLink = `http://localhost:3000/perfil/resetar-senha/${resetToken}`;
      const subject = "Recuperação de senha";
      const htmlContent = `
        <p>Olá,</p>
        <p>Você solicitou a recuperação de senha. Clique no link abaixo para redefinir sua senha:</p>
        <a href="${resetLink}">Redefinir Senha</a>
        <p>Este link é válido por 1 hora.</p>
      `;

      await sendEmail(email, subject, null, htmlContent);
      res.status(200).json({ message: "E-mail enviado com sucesso!" });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        errors:
          "Ocorreu um erro desconhecido ao enviar o e-mail, tente novamente mais tarde.",
      });
    }
  }
};
