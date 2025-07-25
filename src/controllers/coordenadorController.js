const bcrypt = require("bcryptjs");
const Users = require("../models/Users");

module.exports = class CoordenadorController {
  static async store(req, res) {
    const { name, password, email, cpf, confirmepassword } = req.body;

    if (password !== confirmepassword) {
      return res.status(401).json({ errors: "Senhas não iguais!" });
    }

    if (!name || !password || !email || !cpf) {
      return res.status(401).json({ errors: "Preencha todos os campos!" });
    }

    const checkUserExistEmail = await Users.findOne({
      where: { email: email },
    });
    const checkUserExistCpf = await Users.findOne({ where: { cpf: cpf } });

    if (checkUserExistEmail || checkUserExistCpf) {
      return res
        .status(401)
        .json({ errors: "Usuário já cadastrado no sistema" });
    }

    const salt = bcrypt.genSaltSync(15);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const coordenador = {
      name: req.body.name,
      password: hashedPassword,
      email: req.body.email,
      cpf: req.body.cpf,
      role: "coordenador",
      isPending: false,
      isActive: true,
      territorio: "",
    };
    try {
      const coordenadorCriado = await Users.create(coordenador);

      // req.user.userId = coordenadorCriado.id;

      res.status(200).json({ success: "Coordenador criado com sucesso!" });
    } catch (e) {
      console.log(e);
    }
  }
};
