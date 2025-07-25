const bcrypt = require("bcryptjs")

function validarSenha(password, confirmepassword) {
  if (password !== confirmepassword) {
    return { success: false, msg: "Senhas não são iguais!" }
  }

  return { success: true }
}

async function hashPassword(password) {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  return hashedPassword;
}

module.exports = { validarSenha, hashPassword }