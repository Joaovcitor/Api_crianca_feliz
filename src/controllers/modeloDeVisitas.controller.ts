import type { ModeloPlanoDeVisitaDTOCreate } from "../dtos/ModeloPlanoDeVisitaDTO";
import type { UpdateModeloPlanoDeVisitasDTO } from "../dtos/UpdateModeloPlanoDeVisitaDTO";
import { ModeloPlanoDeVisitasService } from "../services/modeloPlanoDeVisita.service";
import { Request, Response } from "express";
export class ModeloPlanoDeVisitasController {
  async create(req: Request, res: Response): Promise<Response> {
    const data: ModeloPlanoDeVisitaDTOCreate = req.body;
    try {
      const modelo = await ModeloPlanoDeVisitasService.create(data);
      return res.status(201).json(modelo);
    } catch (e: any) {
      console.log(e);
      return res.status(500).json({ errors: "Erro interno no servidor!" });
    }
  }
  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const modelos = await ModeloPlanoDeVisitasService.getAll();
      return res.status(200).json(modelos);
    } catch (e: any) {
      console.log(e);
      return res.status(500).json({ errors: "Erro interno no servidor!" });
    }
  }
  async getById(req: Request, res: Response): Promise<Response> {
    const id = parseInt(req.params.id);
    try {
      const modelo = await ModeloPlanoDeVisitasService.getById(id);
      return res.status(200).json(modelo);
    } catch (e: any) {
      console.log(e);
      return res.status(500).json({ errors: "Erro interno no servidor!" });
    }
  }
  async update(req: Request, res: Response): Promise<Response> {
    const id = parseInt(req.params.id);
    const data: UpdateModeloPlanoDeVisitasDTO = req.body;
    try {
      const modelo = await ModeloPlanoDeVisitasService.update(id, data);
      return res.status(200).json(modelo);
    } catch (e: any) {
      console.log(e);
      return res.status(500).json({ errors: "Erro interno no servidor!" });
    }
  }
}

export default new ModeloPlanoDeVisitasController();
