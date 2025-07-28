const Visitador = require("../models/Users");
const Coordenador = require("../models/Users");
const PlanosDeVisita = require("../models/plain");
const Visita = require("../models/Visita_por_geo");
const Child = require("../models/Child");
const { verificaVisitasMarcadas } = require("./visitaGeoService");

async function relatorios(req, res) {
  const id = req.user.id;
  console.log("ID da sessão:", id);
  try {
    const visitadores = await Visitador.findAll({
      where: { coordenadorId: id },
      include: [{ model: Coordenador, as: "coordenador" }],
    });

    const visitadorIds = visitadores.map((visitador) => visitador.id);

    const children = await Child.findAll({
      where: { VisitadorId: visitadorIds },
    });

    const childCountByVisitador = visitadorIds.map((id) => ({
      visitadorId: id,
      count: children.filter((child) => child.VisitadorId === id).length,
    }));

    const planos = await PlanosDeVisita.findAll({
      where: { VisitadorId: visitadorIds },
    });

    const planosByVisitador = visitadorIds.map((id) => ({
      visitadorId: id,
      count: planos.filter((plano) => plano.VisitadorId === id).length,
    }));

    const visitadoresComCrianças = visitadores.map((visitador) => {
      const count =
        childCountByVisitador.find((c) => c.visitadorId === visitador.id)
          ?.count || 0;
      const countPlanos =
        planosByVisitador.find((c) => c.visitadorId === visitador.id)?.count ||
        0;
      return {
        ...visitador.toJSON(),
        qtdChildren: count,
        qtdPlanosVisitador: countPlanos,
      };
    });

    let inicioMes = "";
    let fimMes = "";

    if (req.query.inicioMes && req.query.fimMes) {
      inicioMes = req.query.inicioMes;
      fimMes = req.query.fimMes;
    }

    const visitasMarcadas = await verificaVisitasMarcadas(
      visitadorIds,
      Visita,
      inicioMes,
      fimMes,
      req,
      res
    );

    res.status(200).json({
      visitasMarcadas,
      visitadores: visitadoresComCrianças,
    });
  } catch (e) {
    console.log(e);
  }
}

module.exports = { relatorios };
