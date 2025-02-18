const Users = require("../models/Users");
const jwt = require("jsonwebtoken");
const authenticateUser = require("../utils/authenticateUser");
const bcrypt = require("bcryptjs");

module.exports = class AuthController {
  static async loginPost(req, res) {
    await authenticateUser(Users, req, res);
  }

  static async logout(req, res) {
    req.session.destroy();
    res.status(200).json({ success: "Logout feito com sucesso" });
  }

  static async edit(req, res) {
    const { email, password } = req.body;
    console.log(email);
    const id = req.user.userId;
    console.log(id);

    try {
      const user = await Users.findOne({ where: { email: email } });
      if (user && user.email === email) {
        return res
          .status(400)
          .json({ errors: "Já existe um usuário com esse email!" });
      }
      const salt = bcrypt.genSaltSync(15);
      const passwordHash = bcrypt.hashSync(password, salt);

      const edicao = {
        email: email,
        password: passwordHash,
      };

      await Users.update(edicao, { where: { id: id } });
      res.status(200).json({ message: "Informações editadas com sucesso!" });
    } catch (e) {
      console.log(e);
      res.status(500).json({ errors: "Ocorreu um erro desconhecido!" });
    }
  }
  static async resetPassword(req, res) {
    const { newPassword } = req.body;
    const token = req.params.token;

    try {
      // Verifica e decodifica o token JWT
      const decoded = jwt.verify(token, process.env.SECRET_JWT);

      // Encontra o usuário pelo ID extraído do token
      const user = await Users.findByPk(decoded.id);
      if (!user) {
        return res.status(400).json({ errors: "Usuário não encontrado!" });
      }

      // Gera o hash da nova senha de forma assíncrona
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Atualiza a senha do usuário no banco
      await user.update({ password: hashedPassword });

      return res.status(200).json({ message: "Senha redefinida com sucesso!" });
    } catch (error) {
      // Verifica se o token expirou
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token expirado." });
      }

      console.error("Erro ao redefinir senha: ", error);
      return res.status(500).json({ message: "Erro ao redefinir senha." });
    }
  }
};
