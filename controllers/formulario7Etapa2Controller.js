const { criarForm7Faixa2E3E6 } = require("../utils/createf7");
const Etapa2 = require("../models/Form7_3ma6m");
const {
  verificarQuantidadeDeFormsPorCrianca,
} = require("../services/formService");

module.exports = class Formulario5Etapa2 {
  static async store(req, res) {
    try {
      const visitadorId = req.user.userId;
      await verificarQuantidadeDeFormsPorCrianca(Etapa2, req, res);
      await criarForm7Faixa2E3E6(Etapa2, req, res, visitadorId);
      res.status(200).json({ success: "Formulário criado com sucesso!" });
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .json({
          errors: "Ocorreu um erro desconhecido ao criar esse formulário!",
        });
    }
  }
};
