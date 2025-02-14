const Users = require("../models/Users")
const authenticateUser = require('../utils/authenticateUser')
const bcrypt = require("bcryptjs");

module.exports = class AuthController {
  static async loginPost(req, res) {
    await authenticateUser(Users, req, res)
  }

  static async logout(req, res) {
    req.session.destroy();
    res.status(200).json({ success: "Logout feito com sucesso" })
  }

  static async edit(req, res) {
    const { email, password } = req.body;
    console.log(email)
    const id = req.user.userId;
    console.log(id)

    try {
      const user = await Users.findOne({ where: { email: email } });
      if (user && user.email === email) {
        return res.status(400).json({ errors: "Já existe um usuário com esse email!" });
      }
      const salt = bcrypt.genSaltSync(15);
      const passwordHash = bcrypt.hashSync(password, salt);

      const edicao = {
        email: email,
        password: passwordHash,
      };

      await Users.update(edicao, { where: { id: id } });
      res.status(200).json({ message: "Informações editadas com sucesso!" })
    } catch (e) {
      console.log(e)
      res.status(500).json({ errors: "Ocorreu um erro desconhecido!" })
    }
  }
}