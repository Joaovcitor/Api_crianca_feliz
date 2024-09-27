const { criarForm7Faixa1E7 } = require("../utils/createf7");
const Etapa7 = require('../models/Form5_2aA3a');

module.exports = class Formulario5Etapa2 {
  static async store(req, res) {
    const visitadorId = req.session.userId;
    const id = req.params.id;
    const etapa = await Etapa7.findAll({ where: { ChildId: id } });
    if (etapa.length > 1) {
      return res.status(401).json({
        message: "Você não pode criar mais formulários para essa faixa etária!",
      });
    }
    await criarForm7Faixa1E7(Etapa7, req, res, visitadorId);
    // res.status(200).json({ success: "Formulário criado com sucesso!" });
  }
};
