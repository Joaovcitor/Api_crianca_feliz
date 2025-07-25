const Visitador = require("../models/Users");
const Supervisor = require("../models/Users");
const Caregiver = require("../models/Caregiver");
const Child = require("../models/Child");
const PlanoDeVisita = require("../models/plain");
const Visita = require("../models/Visita_por_geo");

module.exports = class DetailsVisitadoresController {
  static async index(req, res) {
    try {
      const supervisorId = req.user.id;

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

  static async visitadoresDoSupervisor(req, res) {
    try {
      const supervisorId = req.params.id;

      const visitadores = await Visitador.findAll({
        where: { supervisorId: supervisorId, role: "visitador" },
      });
      res.status(200).json({ visitadores });
    } catch (e) {
      console.log(e);
      res.status(500).json({ errors: "Ocorreu um erro desconhecido" });
    }
  }

  static async RelatoriosGerais(req, res) {
    const idCoordenadorSession = req.user.id;

    try {
      const [visitador, supervisor, visitas, childrens, caregivers, planos] =
        await Promise.all([
          Visitador.findAll({ where: { role: "visitador" } }),
          Supervisor.findAll({ where: { role: "supervisor" } }),
          Visita.findAll(),
          Child.findAll(),
          Caregiver.findAll(),
          PlanoDeVisita.findAll(),
        ]);

      res.status(200).json({
        visitador,
        supervisor,
        visitas,
        childrens,
        caregivers,
        planos,
      });
    } catch (e) {
      console.log(e);
      return res
        .status(500)
        .json({ errors: "Ocorreu um erro desconhecido ao buscar relatórios" });
    }
  }

  static async Visitas(req, res) {
    const idCoordenadorSession = req.user.id;

    try {
      const visitas = await Visita.findAll();

      res.status(200).json({
        visitas,
      });
    } catch (e) {
      console.log(e);
      return res
        .status(500)
        .json({ errors: "Ocorreu um erro desconhecido ao buscar relatórios" });
    }
  }

  static async show(req, res) {
    try {
      const SupervisorId = req.user.id;
      const id = req.params.id;

      const visitador = await Visitador.findOne({
        where: { supervisorId: SupervisorId, id: id },
        include: [{ model: Supervisor, as: "coordenador" }],
      });

      const buscarVisitadorPeloId = await Visitador.findOne({
        where: { id: id },
      });

      const caregivers = await Caregiver.findAll({
        where: { visitadorId: visitador.id },
        include: [{ model: Visitador, as: "visitador" }],
      });

      const child = await Child.findAll({
        where: { visitadorId: visitador.id },
        include: [{ model: Visitador, as: "visitador" }],
      });

      const visitasFeitas = await Visita.findAll({
        where: { visitadorId: id, visita_marcada_finalizada: true },
      });
      const visitasMarcadas = await Visita.findAll({
        where: { visitadorId: id, visita_marcada_finalizada: false },
      });
      const planos = await PlanoDeVisita.findAll({
        where: { visitadorId: id },
      });

      res.status(200).json({
        planos,
        child,
        visitador,
        caregivers,
        visitasFeitas,
        visitasMarcadas,
        buscarVisitadorPeloId,
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({ errors: "Ocorreu um erro desconhecido!" });
    }
  }

  static async showInfoForCoordenador(req, res) {
    try {
      const id = req.params.id;

      const visitador = await Visitador.findOne({
        where: { id: id },
      });

      const buscarVisitadorPeloId = await Visitador.findOne({
        where: { id: id },
      });

      const caregivers = await Caregiver.findAll({
        where: { visitadorId: visitador.id },
        include: [{ model: Visitador, as: "visitador" }],
      });

      const child = await Child.findAll({
        where: { visitadorId: visitador.id },
        include: [{ model: Visitador, as: "visitador" }],
      });

      const visitasFeitas = await Visita.findAll({
        where: { visitadorId: id, visita_marcada_finalizada: true },
      });
      const visitasMarcadas = await Visita.findAll({
        where: { visitadorId: id, visita_marcada_finalizada: false },
      });
      const planos = await PlanoDeVisita.findAll({
        where: { visitadorId: id },
      });

      res.status(200).json({
        planos,
        child,
        visitador,
        caregivers,
        visitasFeitas,
        visitasMarcadas,
        buscarVisitadorPeloId,
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({ errors: "Ocorreu um erro desconhecido!" });
    }
  }

  // static async showInfoForCoordenador(req, res) {
  //   try {
  //     const id = req.params.id;

  //     const visitador = await Visitador.findOne({
  //       where: { id: id },
  //     });

  //     if (!visitador) {
  //       return res.status(404).json({ errors: "Visitador não encontrado!" });
  //     }

  //     const [caregivers, child, visitasFeitas, visitasMarcadas, planos] =
  //       await Promise.all([
  //         Caregiver.findAll({
  //           where: { visitadorId: id },
  //           include: [{ model: Visitador, as: "visitador" }],
  //         }),
  //         Child.findAll({
  //           where: { visitadorId: id },
  //           include: [{ model: Visitador, as: "visitador" }],
  //         }),
  //         Visita.findAll({
  //           where: { visitadorId: id, visita_marcada_finalizada: true },
  //         }),
  //         Visita.findAll({
  //           where: { visitadorId: id, visita_marcada_finalizada: false },
  //         }),
  //         PlanoDeVisita.findAll({ where: { visitadorId: id } }),
  //       ]);

  //     res.status(200).json({
  //       planos,
  //       child,
  //       visitador,
  //       caregivers,
  //       visitasFeitas,
  //       visitasMarcadas,
  //     });
  //   } catch (e) {
  //     console.log(e);
  //     res.status(500).json({
  //       errors: "Ocorreu um erro desconhecido ao procurar as informações",
  //     });
  //   }
  // }
};
