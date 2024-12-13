const { Op } = require("sequelize");

async function verificaIdDaCrianca(id, Model, session, req, res) {
  try {
    const child = await Model.findOne({
      where: { id: id, visitadorId: session },
    });
    console.log(child);

    if (!child) {
      console.log("Passei do if do service");
      return res.status(400).json({
        errors:
          "Criança não encontrada ou não autorizada a acessar este recurso.",
      });
    }

    return child;
  } catch (e) {
    console.log(e);
    res.status(500).json({ errors: "Ocorreu um erro desconhecido!" });
  }
}

async function verificaVisitasMarcadas(
  visitadorId,
  Model,
  inicioMes,
  fimMes,
  req,
  res
) {
  try {
    const PesquisainicioMes = new Date(inicioMes);
    const PesquisafimMes = new Date(fimMes);

    return await Model.findAll({
      where: {
        visitadorId: visitadorId,
        visita_marcada_finalizada: false,
        createdAt: { [Op.between]: [PesquisainicioMes, PesquisafimMes] },
      },
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ errors: "Ocorreu um erro desconhecido!" });
  }
}

module.exports = { verificaIdDaCrianca, verificaVisitasMarcadas };
