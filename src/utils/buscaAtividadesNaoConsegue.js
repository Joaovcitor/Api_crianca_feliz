async function BuscaAtividadesNaoConsegueE5(Model, id, req) {
  id = req.params.id;
  const buscar = await Model.findAll({
    where: {
      ChildId: id,
    }
  });

  return buscar.map(atividade => {
    let count = 0;
    if (atividade.q1 === "Ainda não consegue fazer") count++;
    if (atividade.q2 === "Ainda não consegue fazer") count++;
    if (atividade.q3 === "Ainda não consegue fazer") count++;
    if (atividade.q4 === "Ainda não consegue fazer") count++;
    if (atividade.q5 === "Ainda não consegue fazer") count++;
    if (atividade.q6 === "Ainda não consegue fazer") count++;
    return { ...atividade, count };
  })
}

async function BuscaAtividadesNaoConsegueE1E7(Model, id, req) {
  id = req.params.id;
  const buscar = await Model.findAll({
    where: {
      ChildId: id,
    }
  });

  return buscar.map(atividade => {
    let count = 0;
    if (atividade.q1 === "Ainda não consegue fazer") count++;
    if (atividade.q2 === "Ainda não consegue fazer") count++;
    if (atividade.q3 === "Ainda não consegue fazer") count++;
    if (atividade.q4 === "Ainda não consegue fazer") count++;
    if (atividade.q5 === "Ainda não consegue fazer") count++;
    if (atividade.q6 === "Ainda não consegue fazer") count++;
    if (atividade.q7 === "Ainda não consegue fazer") count++;
    if (atividade.q8 === "Ainda não consegue fazer") count++;
    if (atividade.q9 === "Ainda não consegue fazer") count++;
    if (atividade.q10 === "Ainda não consegue fazer") count++;
    if (atividade.q11 === "Ainda não consegue fazer") count++;
    return { ...atividade, count };
  })
}

// o "E" significa etapa nos formulários!
async function BuscaAtividadesNaoConsegueE2E3E9(Model, id, req) {
  id = req.params.id;
  const buscar = await Model.findAll({
    where: {
      ChildId: id,
    }
  });

  return buscar.map(atividade => {
    let count = 0;
    if (atividade.q1 === "Ainda não consegue fazer") count++;
    if (atividade.q2 === "Ainda não consegue fazer") count++;
    if (atividade.q3 === "Ainda não consegue fazer") count++;
    if (atividade.q4 === "Ainda não consegue fazer") count++;
    if (atividade.q5 === "Ainda não consegue fazer") count++;
    if (atividade.q6 === "Ainda não consegue fazer") count++;
    if (atividade.q7 === "Ainda não consegue fazer") count++;
    if (atividade.q8 === "Ainda não consegue fazer") count++;
    if (atividade.q9 === "Ainda não consegue fazer") count++;
    return { ...atividade, count };
  })
}

async function BuscaAtividadesNaoConsegueE4(Model, id, req) {
  id = req.params.id;
  const buscar = await Model.findAll({
    where: {
      ChildId: id,
    }
  });

  return buscar.map(atividade => {
    let count = 0;
    if (atividade.q1 === "Ainda não consegue fazer") count++;
    if (atividade.q2 === "Ainda não consegue fazer") count++;
    if (atividade.q3 === "Ainda não consegue fazer") count++;
    if (atividade.q4 === "Ainda não consegue fazer") count++;
    if (atividade.q5 === "Ainda não consegue fazer") count++;
    if (atividade.q6 === "Ainda não consegue fazer") count++;
    if (atividade.q7 === "Ainda não consegue fazer") count++;
    return { ...atividade, count };
  })
}

module.exports = { BuscaAtividadesNaoConsegueE5, BuscaAtividadesNaoConsegueE1E7, BuscaAtividadesNaoConsegueE2E3E9, BuscaAtividadesNaoConsegueE4 }