const Visitas = require("../models/Visitas");
const Child = require("../models/Child");

module.exports = class TabelaDeVisitas {
  static async index(req, res) {
    const session = req.user.userId;

    try {
      const visitas = await Visitas.findAll({
        where: { visitadorId: session },
      });

      if (!visitas) {
        return res.status(404).json({ errors: "Erro ao buscar visitas!" });
      }

      res.status(200).json({ visitas });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ errors: "Erro ao buscar visitas!" });
    }
  }

  static async store(req, res) {
    const id = req.user.userId;
    const childId = req.params.id;

    try {
      const child = await Child.findOne({
        where: { visitadorId: id, id: childId },
      });

      const visita = {
        dayOfVisit: req.body.dayOfVisit,
        period: req.body.period,
        visitadorId: id,
        childVisited: child.name,
        childId: childId,
      };

      if (!visita.childId || !visita.visitadorId) {
        return res.status(400).json({ errors: "Id da criança ou do visitador em falta!" })
      }

      const verificarTabelasFeitas = await Visitas.count({ where: { childId: childId } })
      if (verificarTabelasFeitas >= 1) {
        return res.status(400).json({ errors: "Essa criança já possui uma tabela criada!" })
      }

      const visitaMarcada = await Visitas.create(visita);
      res
        .status(201)
        .json({ sucess: "Visita marcada com sucesso!", visitaMarcada });
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: "Ocorreu um erro ao marcar a visita!" });
    }
  }

  static async show(req, res) {
    const id = req.params.id;

    try {
      const visita = await Visitas.findOne({
        where: { id: id },
        include: [{ model: Child, attributes: ["name"] }],
      });

      res.status(200).json({ visita });
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .json({ errors: "Ocorreu um erro ao mostrar o nome da criança!" });
    }
  }

  static async update(req, res) {
    try {
      const id = req.params.id;
      const { dayOfVisit, period } = req.body;

      await Visitas.update(
        { dayOfVisit, period },
        {
          where: { id: id },
        }
      );

      res.status(200).json({ sucess: "Visita atualizada com sucesso!" });
    } catch (error) {
      console.log(error);
    }
  }

  static async delete(req, res) {
    try {
      const id = req.params.id;
      const visitadorId = req.user.userId;

      await Visitas.destroy({ where: { visitadorId: visitadorId, id: id } });
      res.status(200).json({ sucess: "Visita deletada com sucesso!" });
    } catch (error) {
      console.log(error);
    }
  }
};
