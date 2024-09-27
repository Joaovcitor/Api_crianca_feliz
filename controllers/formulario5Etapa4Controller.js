const { criarForm7Faixa4 } = require("../utils/createf7");
const Etapa4 = require('../models/Form5_9ma12m');

module.exports = class Formulario5Etapa2 {
  static async store(req, res) {
    const visitadorId = req.session.userId;
    const id = req.body.id;
    const etapa = await Etapa4.findAll({ where: { ChildId: id } });
    if (etapa.length > 1) {
      return res.status(401).json({
        message: "Você não pode criar mais formulários para essa faixa etária!",
      });
    }
    await criarForm7Faixa4(Etapa4, req, res, visitadorId);
    return res.status(200).json({ success: "Formulário criado com sucesso!" });
  }
};
