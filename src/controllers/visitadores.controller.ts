import { Request, Response } from "express";
import { VisitadoresService } from "../services/visitadores.service";

export const VisitadoresController = {
  async desativarConta(req: Request, res: Response): Promise<Response> {
    const visitadorId = parseInt(req.params.id, 10);
    if (!visitadorId) {
      return res.status(400).json({ errors: "ID do visitador é obrigatório" });
    }

    try {
      const visitador = await VisitadoresService.desativarConta(visitadorId);
      return res
        .status(200)
        .json({ message: "Conta desativada com sucesso", visitador });
    } catch (e: unknown) {
      console.log(e);
      return res.status(500).json({ errors: "Erro interno do servidor!" });
    }
  },
  async validarConta(req: Request, res: Response): Promise<Response> {
    const visitadorId = parseInt(req.params.id, 10);
    const coordenadorId = req.user?.id;
    if (!visitadorId) {
      return res.status(400).json({ errors: "ID do visitador é obrigatório" });
    }
    if (!coordenadorId) {
      return res.status(401).json({ errors: "Você precisa estar autenticado" });
    }
    try {
      const visitador = await VisitadoresService.validar(
        visitadorId,
        coordenadorId
      );
      return res
        .status(200)
        .json({ message: "Conta validada com sucesso", visitador });
    } catch (e: unknown) {
      console.log(e);
      return res.status(500).json({ errors: "Erro interno do servidor!" });
    }
  },
};
