function validarDados({ name, email, numCpf, password, territorio, cras }) {
  if (!name || !email || !password || !territorio || !numCpf || !cras) {
    return { success: false, msg: "Preencha todos os campos!" };
  }

  if (typeof name !== "string"
    || typeof email !== "string"
    || typeof password !== "string"
    || typeof territorio !== "string"
    || typeof numCpf !== "string"
    || typeof cras !== "string"
  ) {
    return { success: false, msg: "Verifique os dados inseridos!" }
  }

  return { success: true };
}

module.exports = { validarDados };