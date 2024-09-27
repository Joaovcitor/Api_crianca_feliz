async function BuscaAtividadesSozinhoE5(Model, id, req) {
  id = req.params.id;
  const buscar = await Model.findAll({
    where: {
      ChildId: id,
    }
  });

  return buscar.map(atividade => {
    let count = 0;
    if (atividade.q1 === "Consegue fazer sozinho") count++;
    if (atividade.q2 === "Consegue fazer sozinho") count++;
    if (atividade.q3 === "Consegue fazer sozinho") count++;
    if (atividade.q4 === "Consegue fazer sozinho") count++;
    if (atividade.q5 === "Consegue fazer sozinho") count++;
    if (atividade.q6 === "Consegue fazer sozinho") count++;
    return { ...atividade, count };
  })
}

async function BuscaAtividadesSozinhoE1E7(Model, id, req) {
  id = req.params.id;
  const buscar = await Model.findAll({
    where: {
      ChildId: id,
    }
  });

  return buscar.map(atividade => {
    let count = 0;
    if (atividade.q1 === "Consegue fazer sozinho") count++;
    if (atividade.q2 === "Consegue fazer sozinho") count++;
    if (atividade.q3 === "Consegue fazer sozinho") count++;
    if (atividade.q4 === "Consegue fazer sozinho") count++;
    if (atividade.q5 === "Consegue fazer sozinho") count++;
    if (atividade.q6 === "Consegue fazer sozinho") count++;
    if (atividade.q7 === "Consegue fazer sozinho") count++;
    if (atividade.q8 === "Consegue fazer sozinho") count++;
    if (atividade.q9 === "Consegue fazer sozinho") count++;
    if (atividade.q10 === "Consegue fazer sozinho") count++;
    if (atividade.q11 === "Consegue fazer sozinho") count++;
    return { ...atividade, count };
  })
}

// o "E" significa etapa nos formulários!
async function BuscaAtividadesSozinhoE2E3E9(Model, id, req) {
  id = req.params.id;
  const buscar = await Model.findAll({
    where: {
      ChildId: id,
    }
  });

  return buscar.map(atividade => {
    let count = 0;
    if (atividade.q1 === "Consegue fazer sozinho") count++;
    if (atividade.q2 === "Consegue fazer sozinho") count++;
    if (atividade.q3 === "Consegue fazer sozinho") count++;
    if (atividade.q4 === "Consegue fazer sozinho") count++;
    if (atividade.q5 === "Consegue fazer sozinho") count++;
    if (atividade.q6 === "Consegue fazer sozinho") count++;
    if (atividade.q7 === "Consegue fazer sozinho") count++;
    if (atividade.q8 === "Consegue fazer sozinho") count++;
    if (atividade.q9 === "Consegue fazer sozinho") count++;
    return { ...atividade, count };
  })
}

async function BuscaAtividadesSozinhoE4(Model, id, req) {
  id = req.params.id;
  const buscar = await Model.findAll({
    where: {
      ChildId: id,
    }
  });

  return buscar.map(atividade => {
    let count = 0;
    if (atividade.q1 === "Consegue fazer sozinho") count++;
    if (atividade.q2 === "Consegue fazer sozinho") count++;
    if (atividade.q3 === "Consegue fazer sozinho") count++;
    if (atividade.q4 === "Consegue fazer sozinho") count++;
    if (atividade.q5 === "Consegue fazer sozinho") count++;
    if (atividade.q6 === "Consegue fazer sozinho") count++;
    if (atividade.q7 === "Consegue fazer sozinho") count++;
    return { ...atividade, count };
  })
}

module.exports = { BuscaAtividadesSozinhoE5, BuscaAtividadesSozinhoE1E7, BuscaAtividadesSozinhoE2E3E9, BuscaAtividadesSozinhoE4 }