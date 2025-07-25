async function criarForm7Faixa1E7(Model, req, res, VisitadorId) {
  const { id, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11 } = req.body;
  VisitadorId = req.user.id;

  if (!id) {
    return res.status(401).json({ errors: "Criança invalida!" });
  }

  const dados = {
    q1,
    q2,
    q3,
    q4,
    q5,
    q6,
    q7,
    q8,
    q9,
    q10,
    q11,
    childId: id,
    visitadorId: VisitadorId,
  };

  try {
    await Model.create(dados);
  } catch (e) {
    console.warn(e);
    res
      .status(500)
      .json({ message: "Ocorreu um erro desconhecido. Tente novamente!" });
  }
}

async function criarForm7Faixa4(Model, req, res, VisitadorId) {
  const { id, q1, q2, q3, q4, q5, q6, q7 } = req.body;
  VisitadorId = req.user.id;

  if (!id) {
    return res.status(400).json({ errors: ["Criança invalida!"] });
  }

  const dados = {
    q1,
    q2,
    q3,
    q4,
    q5,
    q6,
    q7,
    childId: id,
    visitadorId: VisitadorId,
  };

  try {
    return await Model.create(dados);
  } catch (e) {
    console.warn(e);
    res
      .status(500)
      .json({ message: "Ocorreu um erro desconhecido. Tente novamente!" });
  }
}

async function criarForm7Faixa5(Model, req, res, VisitadorId) {
  const { id, q1, q2, q3, q4, q5, q6 } = req.body;
  VisitadorId = req.user.id;
  console.log(id);

  if (!id) {
    return req.status(401).json({ errors: ["Criança invalida!"] });
  }

  const dados = {
    q1,
    q2,
    q3,
    q4,
    q5,
    q6,
    childId: id,
    visitadorId: VisitadorId,
  };

  try {
    await Model.create(dados);
  } catch (e) {
    console.warn(e);
    res
      .status(500)
      .json({ message: "Ocorreu um erro desconhecido. Tente novamente!" });
  }
}

async function criarForm7Faixa2E3E6(Model, req, res, VisitadorId) {
  const { id, q1, q2, q3, q4, q5, q6, q7, q8, q9 } = req.body;
  VisitadorId = req.user.id;

  if (!id) {
    return res.status(401).json({ errors: ["Criança invalida!"] });
  }

  const dados = {
    q1,
    q2,
    q3,
    q4,
    q5,
    q6,
    q7,
    q8,
    q9,
    childId: id,
    visitadorId: VisitadorId,
  };

  try {
    await Model.create(dados);
    return res.status(200).json({ success: "Formulário criado com sucesso!" });
  } catch (e) {
    console.warn(e);
    res
      .status(500)
      .json({ message: "Ocorreu um erro desconhecido. Tente novamente!" });
  }
}

module.exports = {
  criarForm7Faixa1E7,
  criarForm7Faixa2E3E6,
  criarForm7Faixa4,
  criarForm7Faixa5,
};
