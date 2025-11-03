import type { PlanoDeVisitaCreateDTO } from "./PlanoDeVisitaDTO";
import type { PlanoDeVisitaUpdate } from "./PlanoDeVisitaUpdateDTO";
import { PlanosDeVisitaService } from "./planosDeVisita.service";
import { Request, Response } from "express";
import { sendSuccess } from "../../core/utils/responseHandler";
import { UnauthorizedError } from "../../core/errors/appErrors";

export const PlanosDeVisitaController = {
  async getAll(req: Request, res: Response) {
    const visitadorId = req.user?.id;
    const childId = parseInt(req.params.id, 10);
    const { page, pageSize } = req.query;

    const pageNum = page ? parseInt(page as string) : undefined;
    const pageSizeNum = pageSize ? parseInt(pageSize as string) : undefined;
    if (!visitadorId) {
      throw new UnauthorizedError("Você deve estar autenticado!");
    }
    const planos = await PlanosDeVisitaService.getAll({
      visitadorId: visitadorId,
      page: pageNum,
      pageSize: pageSizeNum,
      childId: childId,
    });
    return sendSuccess(res, planos);
  },
  async getAllPlanosPregnant(req: Request, res: Response) {
    const visitadorId = req.user?.id;
    const childId = parseInt(req.params.id, 10);
    const { page, pageSize } = req.query;

    const pageNum = page ? parseInt(page as string) : undefined;
    const pageSizeNum = pageSize ? parseInt(pageSize as string) : undefined;
    if (!visitadorId) {
      throw new UnauthorizedError("Você deve estar autenticado!");
    }
    const planos = await PlanosDeVisitaService.getAllPlanosPregnant({
      visitadorId: visitadorId,
      page: pageNum,
      pageSize: pageSizeNum,
      caregiverId: childId,
    });
    return sendSuccess(res, planos);
  },
  async getById(req: Request, res: Response): Promise<Response> {
    const id: number = parseInt(req.params.id, 10);
    const visitadorId = req.user?.id;
    const plano = await PlanosDeVisitaService.getById(id);
    if (plano?.visitorId !== visitadorId) {
      return res.status(403).json({
        errors: "Você não tem permissão para acessar este plano de visita!",
      });
    }
    return sendSuccess(res, plano);
  },
  async createPlanoForChild(req: Request, res: Response): Promise<Response> {
    const data: PlanoDeVisitaCreateDTO = req.body;
    const visitadorId = req.user?.id;
    const childId: number = req.body.childId;
    const caregiverId: number = req.body.caregiverId;

    if (!visitadorId) {
      return res.status(400).json({ errors: "Você deve estar autenticado!" });
    }
    const newPlano = await PlanosDeVisitaService.createPlanoForChild(
      data,
      visitadorId,
      childId,
      caregiverId
    );
    return sendSuccess(res, newPlano);
  },
  async update(req: Request, res: Response): Promise<Response> {
    const id: number = parseInt(req.params.id, 10);
    const data: PlanoDeVisitaUpdate = req.body;
    const updatePlano = await PlanosDeVisitaService.updatePlanoPosVisita(
      id,
      data
    );
    return sendSuccess(res, updatePlano);
  },
};
