const Caregiver = require("../models/Caregiver");
const Child = require("../models/Child");

module.exports = class Children {
  static async store(req, res) {
    const idVisitadorLogado = req.session.userId;
    try {
      const children = {
        caregiverId: req.body.caregiverId,
        name: req.body.name,
        sexo: req.body.sexo,
        born: req.body.born,
        visitadorId: req.session.userId,
        isBpc: req.body.isBpc,
        nis: req.body.nis
      };

      const id = req.params.id;

      const caregiver = await Caregiver.findOne({ where: { id: id, visitadorId: idVisitadorLogado } });

      if (!caregiver) {
        return res.status(404).json({ errors: "Cuidador não encontrado!" });
      }

      await Child.create(children);

      res.status(200).json({ success: "Criança criada com sucesso!" });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        errorInternal: "Ocorreu um erro ao criar a criança! Tente novamente",
      });
    }
  }

  static async update(req, res) {
    const id = req.params.id;
    const session = req.session.userId;
    const { name, born, sexo, nis } = req.body;

    if (
      typeof name !== "string" ||
      typeof sexo !== "string" ||
      typeof nis !== "string"
    ) {
      return res.status(400).json({ error: "preencha todos os campos" });
    }

    if (
      session.userType !== "Supervisor" ||
      session.userType !== "Coordenador"
    ) {
      return res
        .status(401)
        .json({ error: "Você não pode alterar informações dessa criança!" });
    }

    try {
      const childEdited = await Child.findOne({
        where: { id: id, VisitadorId: session },
      });

      if (!childEdited) {
        res
          .status(404)
          .json({ error: "Houve um problema ao buscar pela criança!" });
      }

      await Child.update({ name, born, sexo, nis }, { where: { id: id } });

      res.status(200).json({ success: "Criança atualizada com sucesso!" });
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .json({ errorInternal: "Ocorreu um erro ao editar a criança!" });
    }
  }

  static async show(req, res) {
    const id = req.params.id;
    const session = req.session.userId;

    try {
      const child = await Child.findOne({
        where: { id: id, visitadorId: session },
        attributes: ["name", "id", "born", "sexo"],
      });
      if (!child) {
        return res
          .status(404)
          .json({ error: "Ocorreu um erro ao procurar pela criança." });
      }
      res.status(200).json({ child });
    } catch (e) {
      console.log(e)
      res.status(500).json({
        errorInternal:
          "Ocorreu um erro ao buscar pela criança. Tente novamente!",
      });
    }
  }

  static async validarChild(req, res) {
    const { idChild } = req.body;

    try {
      const child = await Child.findOne({ where: { id: idChild } })

      if (!child) {
        return res.status(400).json({ errors: "Criança não foi achada! Verifique o ID" });
      }

      await Child.update({ isPending: false }, { where: { id: idChild } });
      res.status(200).json({ success: "Criança validada com sucesso" });
    } catch (e) {
      console.log(e)
      res.status(500).json({ errors: "Ocorreu um erro desconhecido ao validar a criança!" })
    }
  }

  static async index(req, res) {
    const session = req.session.userId;

    try {
      const children = await Child.findAll({ where: { visitadorId: session }, include: [{ model: Caregiver, as: "Caregiver" }] });
      if (!children) {
        return res
          .status(404)
          .json({ error: "Não foi encontrada nenhuma criança." });
      }

      res.status(200).json({ children });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        errorInternal:
          "Ocorreu um erro ao buscar as crianças. Tente novamente!",
      });
    }
  }
};
