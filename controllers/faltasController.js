const Faltas = require("../models/Faltas");

module.exports = class FaltasController {
  static async gerarFaltaParaVisitador(req, res) {
    const { motivo_da_falta, visitadorId } = req.body;

    try {
      const faltaCriada = {
        motivo_da_falta: motivo_da_falta,
        visitadorId: visitadorId,
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

  static async gerarFaltaParaSupervisor(req, res) {
    const { motivo_da_falta, supervisorId } = req.body;

    try {
      const faltaCriada = {
        motivo_da_falta: motivo_da_falta,
        supervisorId: supervisorId,
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

  static async pedirParaInvalidarFalta(req, res) {
    const { id, pedir_para_invalidar_falta } = req.body;
    const visitadorId = req.user.userId;

    try {
      await Faltas.update(
        { pedir_para_invalidar_falta: pedir_para_invalidar_falta },
        { where: { id: id, visitadorId: visitadorId } }
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
