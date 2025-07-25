const Visita = require("../models/Visita_por_geo");

module.exports = async function checkVisitasPorGeo(req, res, next) {
  const childId = req.params.id;

  try {
    const visitas = await Visita.findAll({
      where: { childId: childId, visita_marcada_finalizada: false },
    });
    if (visitas.length >= 4) {
      return res
        .status(400)
        .json({ errors: "Esse beneficiário têm 4 visitas marcadas!" });
    }
    next();
  } catch (e) {
    console.log(e);
    return res.status(500).json({ errors: "Ocorreu um erro desconhecido!" });
  }
};
