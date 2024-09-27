async function verificarQuantidadeDeFormsPorCrianca(Model, req) {
  const id = req.body.id;
  if (!id) {
    return { success: false, message: "ID da criança é necessário." }
  }

  const etapa = await Model.count({ where: { ChildId: id } });
  if (etapa > 1) {
    return { success: false, message: "Essa criança possui mais de um formulário para essa faixa etária." }
  }

  return { success: true }
}

async function atualizarForm5E1(Model, req, res, ModelChild) {
  const id = req.params.id;
  const session = req.session.userId;

  try {
    const form = await Model.findAll({
      where: { ChildId: id, VisitadorId: session },
      include: ModelChild,
      atributes: ["id", "name"],
    });

    const currentDate = new Date();

    const atualizar = form.map((up) => {
      const nextUpdate = new Date(up.createdAt);
      nextUpdate.setMonth(nextUpdate.getMonth() + 3);
      const isUpdate = currentDate >= nextUpdate;
      return {
        updatedDue: isUpdate,
        nextUpdate: nextUpdate.toLocaleDateString(),
        childName: up.ModelChild.name,
      };
    });

    res.status(200).json({ atualizar });
  } catch (e) {
    console.warn(e);
    res
      .status(500)
      .json({ errorInternal: "Ocorreu um erro ao buscar os dados!" });
  }
}

module.exports = { verificarQuantidadeDeFormsPorCrianca, atualizarForm5E1 };
