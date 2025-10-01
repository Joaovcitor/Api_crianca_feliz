import bcrypt from "bcryptjs";

export function validarSenha(password: string, confirmepassword: string) {
  if (password !== confirmepassword) {
    return { success: false, msg: "Senhas não são iguais!" };
  }

  return { success: true };
}

export async function hashPassword(password: string) {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  return hashedPassword;
}
