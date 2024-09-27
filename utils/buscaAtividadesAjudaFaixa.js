async function BuscaAtividadesAjudaE5(Model, id, req) {
  id = req.params.id;
  const buscar = await Model.findAll({
    where: {
      ChildId: id,
    }
  });

  return buscar.map(atividade => {
    let count = 0;
    if (atividade.q1 === "Consegue fazer com Ajuda") count++;
    if (atividade.q2 === "Consegue fazer com Ajuda") count++;
    if (atividade.q3 === "Consegue fazer com Ajuda") count++;
    if (atividade.q4 === "Consegue fazer com Ajuda") count++;
    if (atividade.q5 === "Consegue fazer com Ajuda") count++;
    if (atividade.q6 === "Consegue fazer com Ajuda") count++;
    return { ...atividade, count };
  })
}

async function BuscaAtividadesAjudaE1E7(Model, id, req) {
  id = req.params.id;
  const buscar = await Model.findAll({
    where: {
      ChildId: id,
    }
  });

  return buscar.map(atividade => {
    let count = 0;
    if (atividade.q1 === "Consegue fazer com Ajuda") count++;
    if (atividade.q2 === "Consegue fazer com Ajuda") count++;
    if (atividade.q3 === "Consegue fazer com Ajuda") count++;
    if (atividade.q4 === "Consegue fazer com Ajuda") count++;
    if (atividade.q5 === "Consegue fazer com Ajuda") count++;
    if (atividade.q6 === "Consegue fazer com Ajuda") count++;
    if (atividade.q7 === "Consegue fazer com Ajuda") count++;
    if (atividade.q8 === "Consegue fazer com Ajuda") count++;
    if (atividade.q9 === "Consegue fazer com Ajuda") count++;
    if (atividade.q10 === "Consegue fazer com Ajuda") count++;
    if (atividade.q11 === "Consegue fazer com Ajuda") count++;
    return { ...atividade, count };
  })
}

// o "E" significa etapa nos formulários!
async function BuscaAtividadesAjudaE2E3E9(Model, id, req) {
  id = req.params.id;
  const buscar = await Model.findAll({
    where: {
      ChildId: id,
    }
  });

  return buscar.map(atividade => {
    let count = 0;
    if (atividade.q1 === "Consegue fazer com Ajuda") count++;
    if (atividade.q2 === "Consegue fazer com Ajuda") count++;
    if (atividade.q3 === "Consegue fazer com Ajuda") count++;
    if (atividade.q4 === "Consegue fazer com Ajuda") count++;
    if (atividade.q5 === "Consegue fazer com Ajuda") count++;
    if (atividade.q6 === "Consegue fazer com Ajuda") count++;
    if (atividade.q7 === "Consegue fazer com Ajuda") count++;
    if (atividade.q8 === "Consegue fazer com Ajuda") count++;
    if (atividade.q9 === "Consegue fazer com Ajuda") count++;
    return { ...atividade, count };
  })
}

async function BuscaAtividadesAjudaE4(Model, id, req) {
  id = req.params.id;
  const buscar = await Model.findAll({
    where: {
      ChildId: id,
    }
  });

  return buscar.map(atividade => {
    let count = 0;
    if (atividade.q1 === "Consegue fazer com Ajuda") count++;
    if (atividade.q2 === "Consegue fazer com Ajuda") count++;
    if (atividade.q3 === "Consegue fazer com Ajuda") count++;
    if (atividade.q4 === "Consegue fazer com Ajuda") count++;
    if (atividade.q5 === "Consegue fazer com Ajuda") count++;
    if (atividade.q6 === "Consegue fazer com Ajuda") count++;
    if (atividade.q7 === "Consegue fazer com Ajuda") count++;
    return { ...atividade, count };
  })
}

module.exports = { BuscaAtividadesAjudaE5, BuscaAtividadesAjudaE1E7, BuscaAtividadesAjudaE2E3E9, BuscaAtividadesAjudaE4 }