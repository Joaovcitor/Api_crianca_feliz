const { criarForm7Faixa2E3E6 } = require("../utils/createf7");
const Etapa3 = require("../models/Form7_6ma9m");
const {
  verificarQuantidadeDeFormsPorCrianca,
} = require("../services/formService");

module.exports = class Formulario5Etapa2 {
  static async store(req, res) {
    try {
      const visitadorId = req.user.id;
      await verificarQuantidadeDeFormsPorCrianca(Etapa3, req, res);
      await criarForm7Faixa2E3E6(Etapa3, req, res, visitadorId);
    } catch (e) {
      console.log(e);
      res.status(500).json({
        errors: "Ocorreu um erro desconhecido ao criar esse formulário!",
      });
    }
  }
};
