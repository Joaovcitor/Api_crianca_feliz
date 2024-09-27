const { criarForm7Faixa2E3E6 } = require("../utils/createf7");
const Etapa3 = require('../models/Form7_6ma9m');
const {
  verificarQuantidadeDeFormsPorCrianca,
} = require("../services/formService");

module.exports = class Formulario5Etapa2 {
  static async store(req, res) {
    const visitadorId = req.session.userId;
    await verificarQuantidadeDeFormsPorCrianca(Etapa3, req, res)
    await criarForm7Faixa2E3E6(Etapa3, req, res, visitadorId);
    res.status(200).json({ success: "Formulário criado com sucesso!" });
  }
};
