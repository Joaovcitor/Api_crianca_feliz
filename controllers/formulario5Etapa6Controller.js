const { criarForm7Faixa2E3E6 } = require("../utils/createf7");
const Etapa6 = require('../models/Form5_18ma24m');


module.exports = class Formulario5Etapa2 {
  static async store(req, res) {
    const visitadorId = req.user.userId;
    const id = req.params.id;
    const etapa = await Etapa6.findAll({ where: { ChildId: id } });
    if (etapa.length > 1) {
      return res.status(401).json({
        message: "Você não pode criar mais formulários para essa faixa etária!",
      });
    }
    await criarForm7Faixa2E3E6(Etapa6, req, res, visitadorId);
    // res.status(200).json({ success: "Formulário criado com sucesso!" });
  }
};
