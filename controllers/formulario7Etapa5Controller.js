const { criarForm7Faixa5 } = require("../utils/createf7");
const Etapa5 = require('../models/Form7_12ma18m');

module.exports = class Formulario5Etapa2 {
  static async store(req, res) {
    const visitadorId = req.session.userId;
    const id = req.body.id;
    console.log("Venho do back-end", id)
    const etapa = await Etapa5.findAll({ where: { ChildId: id } });
    if (etapa.length > 1) {
      return res.status(401).json({
        message: "Você não pode criar mais formulários para essa faixa etária!",
      });
    }
    await criarForm7Faixa5(Etapa5, req, res, visitadorId);
    // res.status(200).json({ success: "Formulário criado com sucesso!" });
  }
};
