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

  static async editEmail(req, res) {
    const { email } = req.body;
    const id = req.user.userId;

    try {
      const user = await Users.findOne({ where: { email: email } });
      if (user && user.email === email) {
        return res
          .status(400)
          .json({ errors: "Já existe um usuário com esse email!" });
      }

      const edicao = {
        email: email,
      };

      await Users.update(edicao, { where: { id: id } });
      res.status(200).json({ message: "Informações editadas com sucesso!" });
    } catch (e) {
      console.log(e);
      res.status(500).json({ errors: "Ocorreu um erro desconhecido!" });
    }
  }
  static async editPassword(req, res) {
    const { password } = req.body;
    const id = req.user.userId;
    console.log(id);

    try {
      const salt = bcrypt.genSaltSync(15);
      const passwordHash = bcrypt.hashSync(password, salt);

      const edicao = {
        password: passwordHash,
      };

      await Users.update(edicao, { where: { id: id } });
      res.status(200).json({ message: "Senha editada com sucesso!" });
    } catch (e) {
      console.log(e);
      res.status(500).json({ errors: "Ocorreu um erro desconhecido!" });
    }
  }
  static async resetPassword(req, res) {
    const { newPassword } = req.body;
    const token = req.params.token;

    try {
      const decoded = jwt.verify(token, process.env.SECRET_JWT);

      const user = await Users.findByPk(decoded.id);
      if (!user) {
        return res.status(400).json({ errors: "Usuário não encontrado!" });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      await user.update({ password: hashedPassword });

      return res.status(200).json({ message: "Senha redefinida com sucesso!" });
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token expirado." });
      }

      console.error("Erro ao redefinir senha: ", error);
      return res.status(500).json({ message: "Erro ao redefinir senha." });
    }
  }
};
