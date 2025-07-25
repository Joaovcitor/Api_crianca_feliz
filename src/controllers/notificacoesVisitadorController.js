const Notificacoes = require("../models/Notificacoes");
const Supervisor = require("../models/Users");

module.exports = class NotificacoesController {

  static async store(req, res) {
    const { id, notificacao_tipo, descricao } = req.body;
    const visitadorId = req.user.userId;

    if (!id) {
      return res.status(401).json({
        errors: "O ID do usuário é obrigatório!",
      });
    }

    if (typeof notificacao_tipo !== "string" || typeof descricao !== "string") {
      return res
        .status(400)
        .json({ errors: "Tipo de dado inserido é inválido!" });
    }

    if (descricao.length < 3) {
      return res
        .status(400)
        .json({ errors: "Descrição tem que ter pelo menos 3 caracteres!" });
    }

    const notificacao = {
      notificacao_tipo,
      supervisor: id,
      visitadorId: visitadorId,
      descricao,
    };
    try {
      await Notificacoes.create(notificacao);
      res.status(200).json({ success: "Notificação criada com sucesso!" });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        errors: "Ocorreu um erro desconhecido ao criar a notificação!",
      });
    }
  }

  static async index(req, res) {
    const session = req.user.userId;

    try {
      const notificacoes = await Notificacoes.findAll({
        where: { visitadorId: session },
        include: [
          {
            model: Supervisor,
            as: "supervisor",
          },
        ],
      });

      res.status(200).json({ notificacoes })
    } catch (e) {
      console.log(e);
      res.status(500).json({ errors: "Ocorreu um erro desconhecido!" });
    }
  }

  static async show(req, res) {
    const id = req.params.id;
    const session = req.user.userId;

    if (!id) {
      return res
        .status(401)
        .json({ errors: "ID é necessário da notificação é necessário!" });
    }

    try {
      const notificacao = await Notificacoes.findOne({
        where: { id: id, supervisorId: session },
      });

      res.status(200).json({ notificacao });
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .json({ errors: "Ocorreu um erro desconhecido! Recarregue a página." });
    }
  }

  static async update(req, res) {
    const { id, notificacao_tipo, descricacao } = req.body;

    if (!notificacao_tipo || descricacao.length < 3) {
      return res.status(401).json({
        errors: "Tipo de notificação ou descrição não podem ficar em branco!",
      });
    }

    if (!id) {
      return res.status(401).json({ errors: "ID do usuário é necessário!" });
    }

    try {
      await Notificacoes.update(
        { notificacao_tipo, descricacao },
        { where: { id: id } }
      );
      res.status(200).json({ success: "Notificação atualizada com sucesso!" });
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .json({ errors: "Ocorreu um erro desconhecido, tente novamente!" });
    }
  }

  static async delete(req, res) {
    const id = req.body.id;

    if (!id) {
      return res
        .status(401)
        .json({ errors: "Id da notificação é necessário!" });
    }

    try {
      await Notificacoes.destroy({ where: { id: id } });
      res.status(200).json({ success: "Notificação excluída com sucesso!" });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        errors:
          "Ocorreu um erro desconhecido ao tentar deletar os dados! Tente novamente.",
      });
    }
  }
};
