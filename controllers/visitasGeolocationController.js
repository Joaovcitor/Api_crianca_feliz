const Child = require("../models/Child");
const Visita = require("../models/Visita_por_geo");
const { verificaIdDaCrianca } = require("../services/visitaGeoService");

module.exports = class VisitaController {

  static async ShowVisitasMarcadas(req, res) {
    const idChild = req.params.id;
    const session = req.session.userId;

    if (!idChild) {
      return res.status(401).json({ errors: "É necessário inserir o ID da criança." })
    }

    try {
      const visita = await Visita.findAll({
        where: { childId: idChild, visitadorId: session, visita_marcada_finalizada: false },
        include: [{ model: Child, as: "Child" }]
      })

      if (!visita) {
        return res.status(401).json({ errors: "Não foi possível encontrar visitas marcadas para essa criança!" })
      }

      res.status(200).json({ visita })

    } catch (e) {
      console.log(e);
      res.status(500).json({ errors: "Ocorreu um erro desconhecido ao buscar as visitas!" })
    }
  }

  static async show(req, res) {
    const idVisitador = req.session.userId;
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ errors: "ID da visita é necessário para buscar a visita!" })
    }

    try {
      const visita = await Visita.findOne({ where: { id: id, visitadorId: idVisitador } })
      if (!visita) {
        return res.status(404).json({ errors: "Não foi encontrada visita para essa criança" })
      }

      res.status(200).json({ visita })
    } catch (e) {
      console.log(e)
      res.status(500).json({ errors: "Ocorreu um erro desconhecido ao buscar essa visita!" })
    }
  }

  static async agendaVisita(req, res) {
    const { idChild, planoId, data_que_vai_ser_realizada } = req.body;
    const session = req.session.userId;
    if (!idChild || !planoId || !data_que_vai_ser_realizada) {
      return res.status(400).json({ errors: "Dados faltando para marcar a visita!" })
    }

    try {
      const visita = await Visita.findAll({ where: { childId: idChild, finalizou: false } });
      if (visita.length >= 4) {
        return res.status(401).json({ errors: "Você possui 4 visitas marcadas para essa criança, termine as outras!" })
      }

      await Visita.create({ childId: idChild, visitadorId: session, data_que_vai_ser_realizada: data_que_vai_ser_realizada, planoId: planoId, finalizou: false });
      res.status(200).json({ success: "Visita marcada com sucesso!" })
    } catch (e) {
      console.log(e);
      res.status(500).json({ errors: "Ocorreu um erro desconhecido ao marcar a visita!" })
    }
  }

  static async visitasPendentes(req, res) {
    const id = req.session.userId;

    try {
      const visita = await Visita.findAll({
        where: { visitadorId: id, finalizou: false },
        include: [{ model: Child, as: "Child" }],
      });

      res.status(200).json({ visita });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        errorInternal: "Ocorreu um erro ao buscar visitas pendentes!",
      });
    }
  }

  static async storeJustificativaBeneficiarioAusente(req, res) {
    const {
      latitude_beneficiario,
      longitude_beneficiario,
      motivo_da_nao_realizacao,
    } = req.body;
    const id = req.params.id;
    const session = req.session.userId;

    if (!id) {
      return res
        .status(401)
        .json({ errors: "ID é necessário para prosseguir!" });
    }

    await verificaIdDaCrianca(id, Child, session, req, res);

    if (!latitude_beneficiario || !longitude_beneficiario) {
      res
        .status(401)
        .json({ errors: "Latitude e longitude estão indefinidas" });
      return;
    }
    try {
      const visita = await Visita.create({
        latitude_beneficiario,
        longitude_beneficiario,
        childId: id,
        visitadorId: session,
        motivo_da_nao_realizacao,
        finalizou: true,
        beneficiario_em_casa: false,
      });
      res.json({
        message: "Justificativa enviada ao sistema!",
        visita,
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        errorInternal: "Ocorreu um erro ao inserir a localização no sistema!",
      });
    }
  }

  static async invalidarVisita(req, res) {
    const id = req.params.id;
    const { motivo_da_invalidacao } = req.body;

    if (
      typeof motivo_da_invalidacao !== "string" ||
      motivo_da_invalidacao.length < 1
    ) {
      return res.status(400).json({ errors: "Coloque os dados necessários!" });
    }

    if (!id) {
      return res.status(400).json({ errors: "ID é necessário!" });
    }

    try {
      const visita = await Visita.findOne({ where: { id: id } });
      if (!visita) {
        return res.status(404).json({ errors: "Visita não encontrada!" });
      }

      await Visita.update(
        { visita_mentirosa: true, motivo_da_invalidacao },
        { where: { id: id } }
      );
      res.status(200).json({ success: "Visita invalidada com sucesso!" });
    } catch (e) {
      console.log(e);
      res.status(500).json({ errors: "Ocorreu um erro invalidar visita" });
    }
  }

  static async validarVisita(req, res) {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ errors: "ID é necessário!" });
    }

    try {
      const visita = await Visita.findOne({ where: { id: id } });
      if (!visita) {
        return res.status(404).json({ errors: "Visita não encontrada!" });
      }

      await Visita.update(
        { pendente_de_validacao: false },
        { where: { id: id } }
      );
      res.status(200).json({ success: "Visita invalidada com sucesso!" });
    } catch (e) {
      console.log(e);
      res.status(500).json({ errors: "Ocorreu um erro invalidar visita" });
    }
  }

  static async index(req, res) {
    const id = req.params.id;

    if (!id) {
      return res.status(401).json({ errors: "ID é necessário!" });
    }

    try {
      const visitaFinalizadas = await Visita.findAll({
        where: {
          childId: id,
          finalizou: true,
          pendente_de_validacao: true,
          visita_mentirosa: false,
          beneficiario_em_casa: true,
          visita_marcada_finalizada: true
        },
      });

      const visitasSemBeneficiarios = await Visita.findAll({
        where: { childId: id, beneficiario_em_casa: false },
      });

      if (
        !visitaFinalizadas.length === 0 ||
        !visitasSemBeneficiarios.length === 0
      ) {
        return res
          .status(404)
          .json({ errors: "Nenhuma Visita foi encontrada" });
      }

      res.status(200).json({ visitaFinalizadas, visitasSemBeneficiarios });
    } catch (e) {
      console.log(e);
      res.status(404).json({
        errors:
          "Ocorreu um erro ao buscar os dados das Visitas por geolocalização.",
      });
    }
  }

  static async showSingleInfo(req, res) {
    const id = req.params.id;

    try {
      const visita = await Visita.findOne({ where: { id: id } });
      if (!visita) {
        return res.status(404).json({ errors: "Visita não encontrada!" });
      }
      res.status(200).json({ visita });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        errorInternal: "Ocorreu um erro desconhecido ao buscar a visita!",
      });
    }
  }

  static async store(req, res) {
    const { latitude, longitude, hora_inicio, idVisita } = req.body;
    const session = req.session.userId;

    const visitasNaoFeitas = await Visita.findAll({
      where: { visitadorId: session, visita_em_andamento: true },
    });

    if (visitasNaoFeitas.length > 0) {
      return res.status(400).json({
        warning: "Você ainda possui visitas pendentes de finalização.",
      });
    }

    if (!latitude || !longitude) {
      res
        .status(400)
        .json({ errors: "Latitude e longitude estão indefinidas" });
      return;
    }
    try {
      const visita = await Visita.update({
        latitude,
        longitude,
        hora_inicio,
        finalizou: false,
        visita_em_andamento: true
      }, { where: { id: idVisita } });
      res.status(200).json({
        message: "Visita iniciada. Sua localização foi inserida no sistema!",
        visita,
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        errorInternal: "Ocorreu um erro ao inserir a localização no sistema!",
      });
    }
  }

  static async update(req, res) {
    try {
      const { id, latitude_final, longitude_final, hora_fim } = req.body;
      const session = req.session.userId;
      if (!latitude_final || !longitude_final) {
        res
          .status(400)
          .json({ errors: "Latitude e longitude estão indefinidas" });
        return;
      }

      await Visita.update(
        {
          latitude_final,
          longitude_final,
          hora_fim,
          finalizou: true,
          visita_marcada_finalizada: true,
          visita_em_andamento: false
        },
        { where: { id: id, visitadorId: session } }
      );
      res.status(200).json({
        message: "Visita Finalizada. Sua localização foi inserida no sistema!",
      });
    } catch (e) {
      console.log(e);
      return res
        .status(400)
        .json({ errors: "Ocorreu um erro ao finalizar a visita!" });
    }
  }
};
