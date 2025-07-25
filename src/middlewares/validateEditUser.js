const { isEmail, isLength } = require("validator")

const validateEditUser = (req, res, next) => {
  const { email, password, confirmepassword } = req.body;

  if (!isEmail(email)) {
    return res.status(400).json({ errors: "E-mail inválido!" })
  }

  if (isLength(password, { min: 6, max: 30 })) {
    return res.status(400).json({ errors: "Senha deve ter no mínimo 6 caracteres e no máximo 30" })
  }

  if (password !== confirmepassword) {
    return res.status(400).json({ errors: "Senhas não iguais!" })
  }

  next()
}

module.exports = validateEditUser