const Chamados = require("../models/Chamados");

module.exports = class ChamadosController {
  static async store(req, res) {
    const { descricao, tipo_do_chamado, userIdDestinatario } = req.body;
    const userId = req.user.userId;

    try {
      await Chamados.create(
        descricao,
        tipo_do_chamado,
        userId,
        userIdDestinatario
      );
      res.status(201).json({ message: "Chamado criado com sucesso!" });
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .json({ errors: "Ocorreu um erro desconhecido ao criar o chamado" });
    }
  }

  static async chamadosDosDestinatarios(req, res) {
    const userId = req.user.userId;

    try {
      const chamados = await Chamados.findAll({
        userIdDestinatario: { userId: userId },
      });

      if (chamados.length < 1) return;

      res.status(200).json({ chamados });
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .json({ errors: "Ocorreu um erro desconhecido ao buscar os chamados" });
    }
  }

  static async meusChamados(req, res) {
    const id = req.user.userId;

    try {
      const chamados = await Chamados.findAll({ where: { userId: id } });
      if (chamados.length < 1) return;

      res.status(200).json({ chamados });
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .json({ errors: "Ocorreu um erro ao buscar seus chamados" });
    }
  }
};
