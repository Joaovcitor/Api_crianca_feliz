const Child = require("../models/Child");
const Visita = require("../models/Visita_por_geo");
const PlanoDeVisita = require("../models/plain");

module.exports = class planoDeVisita {

  static async store(req, res) {
    const visitadorId = req.user.userId;
    const childId = req.params.id;
    const {
      etapa1,
      etapa2,
      etapa3,
      objetivo,
      dia_a_ser_realizada_a_visita,
      grau_de_dificuldade_objetivo,
    } = req.body;

    if (
      !objetivo ||
      !etapa1 ||
      !etapa2 ||
      !etapa3 ||
      !dia_a_ser_realizada_a_visita ||
      !grau_de_dificuldade_objetivo
    ) {
      return res.status(400).json({ error: "Preencha todos os campos!" });
    }

    try {
      const visita = await Visita.findAll({ where: { childId: childId, visita_marcada_finalizada: false } });
      if (visita.length >= 4) {
        return res.status(400).json({ errors: "Você tem mais de 4 visitas marcadas para essa criança! Termine suas visitas antes de criar mais planos." })
      }
      const plano = await PlanoDeVisita.create({
        etapa1,
        etapa2,
        etapa3,
        objetivo,
        dia_a_ser_realizada_a_visita,
        childId,
        visitadorId,
        grau_de_dificuldade_objetivo,
      });
      res.status(200).json({ success: "Plano criado com sucesso!", plano });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ errors: "Ocorreu um erro ao criar o plano de visita!" });
    }
  }

  static async show(req, res) {
    const session = req.user.userId;
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ errors: "ID é necessário!" });
    }

    try {
      const plano = await PlanoDeVisita.findOne({
        where: { visitadorId: session, id: id },
        include: [{ model: Child, as: "Child" }],
      });

      const visitaFeita = await Visita.findOne({ where: { planoId: id, visitadorId: session } })

      if (plano.visitadorId !== session) {
        return res.status(401).json({
          errors: "Você não tem permissão para acessar esse plano de visita!",
        });
      }

      if (plano.length < 1) {
        return res.status(400).json({
          errors: "Não foi encontrado nenhum plano para essa criança!",
        });
      }

      res.status(200).json({ plano, visitaFeita });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        errorInternal:
          "Ocorreu um erro ao procurar o plano de visita, tente novamente!",
      });
    }
  }

  static async index(req, res) {
    const session = req.user.userId;
    const id = req.params.id;

    try {
      const plano = await PlanoDeVisita.findAll({
        where: { VisitadorId: session, ChildId: id },
      });

      const planoHome = await PlanoDeVisita.findAll({
        where: { VisitadorId: session },
      });

      if (!plano) {
        return res.status(404).json({
          error:
            "Não foi  possível encontrar o plano especificado, tente novamente!",
        });
      }

      res.status(200).json({ plano, planoHome });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        errorInternal:
          "Ocorreu um erro ao procurar o plano de visita, tente novamente!",
      });
    }
  }

  static async relatorioHome(req, res) {
    const session = req.user.userId;

    try {
      const planoHome = await PlanoDeVisita.findAll({
        where: { VisitadorId: session },
      });
      res.status(200).json({ planoHome });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        errorInternal:
          "Ocorreu um erro ao procurar o plano de visita, tente novamente!",
      });
    }
  }

  static async deletePlano(req, res) {
    try {
      const id = req.params.id;
      if (!id) {
        return res.status(404).json({
          errors: "Ocorreu um erro ao deletar o plano! Tente novamente.",
        });
      }

      await PlanoDeVisita.destroy({ where: { id: id } });
      res.status(200).json({ sucess: "Plano deletado com sucesso" });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        errorInternal:
          "Ocorreu um erro interno ao deletar o plano! Tente novamente.",
      });
    }
  }

  static async update(req, res) {
    const id = req.params.id;
    const session = req.user.userId
    const visita_realizada_geo = await Visita.findOne({ where: { planoId: id, visitadorId: session } })

    const edicaoPlano = {
      objetivo: req.body.objetivo,
      etapa1: req.body.etapa1,
      etapa2: req.body.etapa2,
      etapa3: req.body.etapa3,
      observacao: req.body.observacao,
      conseguiu_fazer: req.body.conseguiu_fazer,
      fez_com_dificuldade: req.body.fez_com_dificuldade,
    };

    if (
      !edicaoPlano.objetivo ||
      !edicaoPlano.etapa1 ||
      !edicaoPlano.etapa2 ||
      !edicaoPlano.etapa3
    ) {
      return res.status(401).json({ error: "Preencha todos os campos!" });
    }

    try {
      const planoEditado = await PlanoDeVisita.update(edicaoPlano, {
        where: { id: id, visitadorId: session },
      });

      if (!planoEditado) {
        return res
          .status(400)
          .json({ error: "Ocorreu um erro ao editar o plano!" });
      }

      res.status(200).json({ success: "Plano editado com sucesso!", visita_realizada_geo });

    } catch (e) {
      console.log(e);
      res.status(500).json({
        errorInternal: "Ocorreu um erro ao editar seu plano, tente novamente",
      });
    }
  }
};
