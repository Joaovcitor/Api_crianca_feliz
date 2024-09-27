async function buscarIds(Model, alias, sessionId) {
  const visitadores = await Model.findAll({
    where: { supervisorId: sessionId },
    include: [
      {
        model: Model,
        as: alias,
      },
    ],
  });
  return visitadores.map((idV) => idV.id);
}

async function criaVariasNotificacoes(
  idsArrays,
  notificacao_tipo,
  descricao,
  res,
  Model,
  sessionSupervisor
) {
  for (let i = 0; i < idsArrays.length; i++) {
    const ids = idsArrays[i];

    try {
      await Model.create({
        supervisorId: sessionSupervisor,
        visitadorId: ids,
        notificacao_tipo,
        descricao,
      });
    } catch (e) {
      console.log("Erro ao criar notificação para o id", ids, e);
      res.status(500).json({ errors: "Ocorreu um erro ao criar notificações" });
      return;
    }
  }
}

module.exports = { buscarIds, criaVariasNotificacoes };
