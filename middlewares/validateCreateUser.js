const validator = require("validator");
const { cpf } = require("cpf-cnpj-validator")

const validateDataUsers = (req, res, next) => {
  const { name, email, password, cpf: numCpf, confirmepassword } = req.body;

  if (validator.isEmpty(name) || validator.isEmpty(email) || validator.isEmpty(password) || validator.isEmpty(numCpf)) {
    return res.status(400).json({ errors: "Preencha todos os dados necessários!" })
  }

  if (password !== confirmepassword) {
    return res.status(400).json({ errors: "Senhas não coincidem, tente novamente." })
  }

  if (!validator.isNumeric(numCpf) || numCpf.length < 11) {
    return res.status(400).json({ errors: "CPF deve conter apenas número e conter apenas 11 caracteres!" })
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ errors: "E-mail inválido!" })
  }

  if (validator.isLength(password, { min: 6 })) {
    return res.status(400).json({ errors: "Senha deve ter pelo menos 6 caracteres." })
  }

  if (validator.isEmpty(name)) {
    return res.status(400).json({ errors: "Nome não pode ser vazio!" });
  }

  if (!cpf.isValid(numCpf)) {
    return res.status(400).json({ errors: "Número de CPF é inválido." })
  }

  next()
}

module.exports = validateDataUsers