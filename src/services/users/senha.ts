import bcrypt from "bcryptjs";

function validarSenha(password: string, confirmepassword: string) {
  if (password !== confirmepassword) {
    return { success: false, msg: "Senhas não são iguais!" };
  }

  return { success: true };
}

async function hashPassword(password: string) {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  return hashedPassword;
}

module.exports = { validarSenha, hashPassword };
