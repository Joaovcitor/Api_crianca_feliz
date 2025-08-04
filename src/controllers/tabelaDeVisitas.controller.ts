import type { TabelaDeVisitasCreateDTO } from "../dtos/TabelaDeVisitasCreateDTO";
import { TabelaDeVisitasService } from "../services/tabelaDeVisitas.service";
import { Request, Response } from "express";

export const PlanoDevisitasController = {
  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const tabelas = await TabelaDeVisitasService.getAll();
      return res.status(200).json(tabelas);
    } catch (e: any) {
      console.log(e);
      return res.status(500).json({ errors: "Erro interno do servidor!" });
    }
  },
  async getById(req: Request, res: Response): Promise<Response> {
    const id = parseInt(req.params.id);
    try {
      const tabela = await TabelaDeVisitasService.getById(id);
      return res.status(200).json(tabela);
    } catch (e: any) {
      console.log(e);
      return res.status(500).json({ errors: "Erro interno do servidor!" });
    }
  },
  async create(req: Request, res: Response): Promise<Response> {
    const data: TabelaDeVisitasCreateDTO = req.body;
    const childId = parseInt(req.params.id, 10);
    const visitadorId = req.user?.id;
    const caregiverId = parseInt(req.params.id, 10);
    if (!visitadorId)
      return res.status(401).json({ errors: "Você deve estar autenticado!" });
    try {
      await TabelaDeVisitasService.create(
        data,
        visitadorId,
        childId,
        caregiverId
      );
      return res.status(201).json({ message: "Tabela criada com sucesso!" });
    } catch (e: any) {
      console.log(e);
      return res.status(500).json({ errors: "Erro interno do servidor!" });
    }
  },
};
