import { SupervisorService } from "../services/supervisor.service";
import { Request, Response } from "express";
export const SupervisorController = {
  getVisitadoresDoSupervisor: async (req: Request, res: Response) => {
    const supervisorId = req.user?.id;
    if (!supervisorId) {
      return res.status(400).json({ error: "Supervisor ID is required" });
    }
    try {
      const visitadores = await SupervisorService.getVisitadoresDoSupervisor(
        supervisorId
      );
      return res.status(200).json(visitadores);
    } catch (e: any) {
      console.log(e);
      return res.status(500).json({ errors: "Erro interno do servidor!" });
    }
  },
};
