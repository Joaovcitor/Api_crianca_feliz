const Visitador = require("../models/Users");
const Supervisor = require("../models/Users");
const Caregiver = require("../models/Caregiver");
const Child = require("../models/Child");
const {
  mapChildrens,
  mapPlanos,
  mapPesquisa,
  mapCaregivers,
  mapVisitasFeitas,
  mapVisitasPendentesDeSeremFinalizadas
} = require("../utils/mapsDetailsOfVisitador");
const { relatorios } = require("../services/relatorioService");
const PlanoDeVisita = require("../models/plain");
const Visita = require("../models/Visita_por_geo");

module.exports = class DetailsVisitadoresController {
  static async index(req, res) {
    try {
      const supervisorId = req.session.userId;

      const visitador = await Visitador.findAll({
        where: { supervisorId: supervisorId, role: "visitador" },
      });

      if (!visitador) {
        return res.status(404).json({ errors: "Não existem visitadores!" });
      }
      res.status(200).json({ visitador });
    } catch (e) {
      console.log(e);
      res.status(500).json({ errorInternal: "Ocorreu um erro desconhecido" });
    }
  }

  static async show(req, res) {
    try {
      const SupervisorId = req.session.userId;
      const id = req.params.id;

      const visitador = await Visitador.findOne({
        where: { supervisorId: SupervisorId, id: id },
        include: [{ model: Supervisor, as: "coordenador" }],
      });

      const caregivers = await Caregiver.findAll({
        where: { visitadorId: visitador.id },
        include: [{ model: Visitador, as: "visitador" }],
      });

      const child = await Child.findAll({
        where: { visitadorId: visitador.id },
        include: [{ model: Visitador, as: "visitador" }],
      });

      const visitasFeitas = await Visita.findAll({ where: { visitadorId: id, visita_marcada_finalizada: true } })
      const visitasMarcadas = await Visita.findAll({ where: { visitadorId: id, visita_marcada_finalizada: false } })
      const planos = await PlanoDeVisita.findAll({ where: { visitadorId: id } });

      res.status(200).json({ planos, child, visitador, caregivers, visitasFeitas, visitasMarcadas })

      // const mappedChildren = await mapChildrens(Child, visitador, Visitador, Caregiver);
      // const mappedCaregivers = await mapCaregivers(caregivers);

      // let { inicioMes = "", fimMes = "" } = req.body
      // let planos = [];
      // let visitas = [];
      // let visitasNaoFinalizadas = [];

      // const planos = await mapPesquisa(id, inicioMes, fimMes, PlanoDeVisita);
      // const visitas = await mapVisitasFeitas(id, inicioMes, fimMes, Visita);
      // const visitasNaoFinalizadas = await mapVisitasPendentesDeSeremFinalizadas(id, inicioMes, fimMes, Visita)
      // const dataFormatadaDosPlanos = await mapPlanos(planos);
      // res.status(200).json({
      //   planos: dataFormatadaDosPlanos,
      //   child: mappedChildren,
      //   caregiver: mappedCaregivers,
      //   visitador,
      //   visitas,
      //   visitasNaoFinalizadas
      // });
    } catch (e) {
      console.log(e);
    }
  }

  static async showInfoForCoordenador(req, res) {
    await relatorios(req, res);
  }
};
