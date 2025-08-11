import type { ChamadosCreateDTO } from "../dtos/ChamadoCreateDTO";
import { ChamadosService } from "../services/chamados.service";
import { Request, Response } from "express";
export const ChamadosController = {
  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const chamados = await ChamadosService.getAll();
      return res.status(200).json(chamados);
    } catch (e: any) {
      console.log(e);
      return res.status(500).json({ error: "Erro interno do servidor!" });
    }
  },
  async getById(req: Request, res: Response): Promise<Response> {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: "ID inválido!" });
    }
    try {
      const chamado = await ChamadosService.getById(id);
      if (!chamado) {
        return res.status(404).json({ error: "Chamado não encontrado!" });
      }
      return res.status(200).json(chamado);
    } catch (e: any) {
      console.log(e);
      return res.status(500).json({ error: "Erro interno do servidor!" });
    }
  },

  async create(req: Request, res: Response): Promise<Response> {
    const data: ChamadosCreateDTO = req.body;
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: "Usuário não autenticado!" });
    }
    try {
      const novoChamado = await ChamadosService.create(userId, data);
      return res.status(201).json(novoChamado);
    } catch (e: any) {
      console.log(e);
      return res.status(500).json({ error: "Erro interno do servidor!" });
    }
  },
};
