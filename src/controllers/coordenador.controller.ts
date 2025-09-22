import { Request, Response } from "express";
import { CoordenadorService } from "../services/coordenador.service";

export const CoordenadorController = {
  getSupervisores: async (req: Request, res: Response): Promise<Response> => {
    const coordenadorId = req.user?.id;
    if (!coordenadorId) {
      return res.status(400).json({ errors: "Coordenador não encontrado!" });
    }
    try {
      const visitadores = await CoordenadorService.listarMeusSupervisores(
        coordenadorId
      );
      return res.status(200).json(visitadores);
    } catch (e: unknown) {
      console.log(e);
      return res.status(500).json({ errors: "Erro interno do servidor!" });
    }
  },
  getSupervisorById: async (req: Request, res: Response): Promise<Response> => {
    const supervisorId = parseInt(req.params.supervisorId);
    if (!supervisorId) {
      return res.status(400).json({ errors: "Supervisor não encontrado!" });
    }
    try {
      const supervisor = await CoordenadorService.getSupervisorById(
        supervisorId
      );
      return res.status(200).json(supervisor);
    } catch (e: unknown) {
      console.log(e);
      return res.status(500).json({ errors: "Erro interno do servidor!" });
    }
  },
};
