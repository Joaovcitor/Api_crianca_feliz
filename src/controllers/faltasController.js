const Faltas = require("../models/Faltas");

module.exports = class FaltasController {
  static async store(req, res) {
    const { motivo_da_falta, userId, quando_ocorreu_a_falta } = req.body;
    const registradorId = req.user.userId;

    try {
      const faltaCriada = {
        motivo_da_falta: motivo_da_falta,
        userId: userId,
        registradorId: registradorId,
        quando_ocorreu_a_falta: quando_ocorreu_a_falta,
      };
      await Faltas.create(faltaCriada);
      res.status(201).json({ message: "Falta criada com sucesso!" });
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .json({ errors: "Ocorreu um erro desconhecido ao gerar a falta!" });
    }
  }

  // método usado pelo usuário com role de coordenador
  static async todasAsFaltasDosUsuarios(req, res) {
    try {
      const faltas = await Faltas.findAll({});
      if (faltas.length === 0) {
        return res.status(204).send("Não tem nada");
      }
      res.status(200).json({ faltas });
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .json({ errors: "Ocorreu um erro desconhecido ao buscar as faltas" });
    }
  }

  static async faltasQueORegistradorDeu(req, res) {
    const registradorId = req.user.userId;

    try {
      const faltas = await Faltas.findAll({
        where: { registradorId: registradorId },
      });

      if (!faltas.length) return;

      res.status(200).json({ faltas });
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .json({ errors: "Ocorreu um erro desconhecido ao buscas as faltas" });
    }
  }

  static async invalidarFalta(req, res) {
    const { id } = req.body;
    try {
      await Faltas.update({ falta_invalidada: true }, { where: { id: id } });
      res.status(200).json({ message: "Falta Invalidada" });
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .json({ errors: "Ocorreu um erro desconhecido ao invalidar a falta!" });
    }
  }

  static async show(req, res) {
    const id = req.params.id;
    const userId = req.user.userId;

    try {
      const falta = await Faltas.findOne({ where: { id: id, userId: userId } });
      if (!falta) {
        return;
      }

      res.status(200).json({ falta });
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .json({ errors: "Ocorreu um erro desconhecido ao buscar sua falta" });
    }
  }

  static async pedirParaInvalidarFalta(req, res) {
    const { id, pedir_para_invalidar_falta } = req.body;
    try {
      await Faltas.update(
        { pedir_para_invalidar_falta: pedir_para_invalidar_falta },
        { where: { id: id } }
      );

      res.status(200).json({ message: "Pedido feito com sucesso!" });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        errors:
          "Ocorreu um erro desconhecido ao pedir para invalidar sua visita!",
      });
    }
  }
};
