import type { PlanoDeVisitaCreateDTO } from "../dtos/PlanoDeVisitaDTO";
import type { PlanoDeVisitaUpdate } from "../dtos/PlanoDeVisitaUpdateDTO";
import { PlanosDeVisitaService } from "../services/planosDeVisita.service";
import { Request, Response } from "express";

export const PlanosDeVisitaController = {
  async getAll(req: Request, res: Response): Promise<Response> {
    const visitadorId = req.user?.id;
    const childId = parseInt(req.params.id, 10);
    const { page, pageSize } = req.query;

    const pageNum = page ? parseInt(page as string) : undefined;
    const pageSizeNum = pageSize ? parseInt(pageSize as string) : undefined;
    if (!visitadorId) {
      return res.status(400).json({ errors: "Você deve estar autenticado!" });
    }
    try {
      const planos = await PlanosDeVisitaService.getAll({
        visitadorId: visitadorId,
        page: pageNum,
        pageSize: pageSizeNum,
        childId: childId,
      });
      return res.status(200).json(planos);
    } catch (e: unknown) {
      console.log(e);
      return res.status(500).json({ errors: "Erro interno do servidor!" });
    }
  },
  async getById(req: Request, res: Response): Promise<Response> {
    const id: number = parseInt(req.params.id, 10);
    const visitadorId = req.user?.id;
    try {
      const plano = await PlanosDeVisitaService.getById(id);
      if (plano?.visitorId !== visitadorId) {
        return res.status(403).json({
          errors: "Você não tem permissão para acessar este plano de visita!",
        });
      }
      return res.status(200).json(plano);
    } catch (e: unknown) {
      console.log(e);
      return res.status(500).json({ errors: "Erro interno do servidor!" });
    }
  },
  async createPlanoForChild(req: Request, res: Response): Promise<Response> {
    const data: PlanoDeVisitaCreateDTO = req.body;
    const visitadorId = req.user?.id;
    const childId: number = parseInt(req.params.id, 10);
    if (!visitadorId) {
      return res.status(400).json({ errors: "Você deve estar autenticado!" });
    }
    try {
      const newPlano = await PlanosDeVisitaService.createPlanoForChild(
        data,
        visitadorId,
        childId
      );
      return res.status(201).json(newPlano);
    } catch (e: unknown) {
      console.log(e);
      return res.status(500).json({ errors: "Erro interno do servidor!" });
    }
  },
  async update(req: Request, res: Response): Promise<Response> {
    const id: number = parseInt(req.params.id, 10);
    const data: PlanoDeVisitaUpdate = req.body;

    try {
      const updatePlano = await PlanosDeVisitaService.updatePlanoPosVisita(
        id,
        data
      );
      return res.status(200).json(updatePlano);
    } catch (e: unknown) {
      console.log(e);
      return res.status(500).json({ errors: "Erro interno do servidor!" });
    }
  },
};
