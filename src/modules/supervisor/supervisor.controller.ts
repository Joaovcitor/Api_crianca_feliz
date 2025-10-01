import { SupervisorService } from "./supervisor.service";
import { Request, Response } from "express";
import { sendSuccess } from "../../core/utils/responseHandler";
export const SupervisorController = {
  getVisitadoresDoSupervisor: async (req: Request, res: Response) => {
    const supervisorId = req.user?.id;
    if (!supervisorId) {
      return res.status(400).json({ error: "Supervisor ID is required" });
    }
    const visitadores = await SupervisorService.getVisitadoresDoSupervisor(
      supervisorId
    );
    return sendSuccess(res, visitadores);
  },
};
