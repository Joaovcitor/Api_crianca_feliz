const { criarForm7Faixa5 } = require("../utils/createf7");
const Etapa5 = require("../models/Form7_12ma18m");

module.exports = class Formulario5Etapa2 {
  static async store(req, res) {
    const visitadorId = req.user.userId;
    const id = req.body.id;
    const etapa = await Etapa5.findAll({ where: { ChildId: id } });
    if (etapa.length === 1) {
      return res.status(400).json({
        errors: "Você não pode criar mais formulários para essa faixa etária!",
      });
    }

    console.log(Etapa5);
    await criarForm7Faixa5(Etapa5, req, res, visitadorId);
    res.status(200).json({ success: "Formulário criado com sucesso!" });
  }
};
