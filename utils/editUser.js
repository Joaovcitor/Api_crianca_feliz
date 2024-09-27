const bcrypt = require("bcryptjs");

async function editarInformacoesUsuarios(Model, req, res) {
  const { email, password } = req.body;
  const session = req.session.userId;

  const visitadorEditado = await Model.findOne({ where: { email: email } });

  if (visitadorEditado) {
    return res.status(400).json({ errors: "Email pertence a outro usuário!" });
  }

  const salt = bcrypt.genSaltSync(15);
  const passwordHash = bcrypt.hashSync(password, salt);

  const edicao = {
    email: req.body.email,
    password: passwordHash,
  };

  try {
    await Model.update(edicao, { where: { id: session } });
    res.status(200).json({ sucess: "Edição dos dados feita com sucesso!" });
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ errorInternal: "Ocorreu um erro inesperado, tente novamente!" });
  }
}

module.exports = editarInformacoesUsuarios;
