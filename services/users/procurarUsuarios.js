const User = require("../../models/Users")

async function procurarUsuarioNoBancoDeDados(email, numCpf) {

  try {
    const emailExist = await User.findOne({ where: { email: email, cpf: numCpf } });
    const cpfExist = await User.findOne({ where: { cpf: numCpf } });

    if (emailExist || cpfExist) {
      return { success: false, msg: "Visitador já existe no sistema!" }
    }

    return { success: true }
  } catch (e) {
    console.log(e)
    return { success: false, msg: "Ocorreu um erro desconhecido ao buscar dados do novo usuário!" }
  }
}

module.exports = { procurarUsuarioNoBancoDeDados }