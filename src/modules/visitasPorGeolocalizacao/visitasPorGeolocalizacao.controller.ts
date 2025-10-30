import { Request, type Response } from "express";
import { visitasPorGeoLocalizacaoService } from "./visitasPorGeoLocalizacao.service";
import type { VisitCreateDTO } from "./VisitCreateDTO";
import type { VisitStartDTO } from "./VisitStartDTO";
import type { VisitEndDTO } from "./VisitEndDTO";
import type { VisitUpdateDTO } from "./VisitUpdateDTO";

export const VisitasPorGeolocalizacaoController = {
  async getAll(req: Request, res: Response): Promise<Response> {
    const visitadorId = req.user?.id;

    if (!visitadorId)
      return res.status(401).json({ errors: "Você deve estar autenticado!" });

    try {
      const visitas = await visitasPorGeoLocalizacaoService.getAll(visitadorId);
      return res.status(200).json(visitas);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ errors: "Erro interno do servidor!" });
    }
  },
  async getById(req: Request, res: Response): Promise<Response> {
    const id = parseInt(req.params.id);

    try {
      const visita = await visitasPorGeoLocalizacaoService.getById(id);
      return res.status(200).json(visita);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ errors: "Erro interno  do servidor!" });
    }
  },
  async iniciarVisita(req: Request, res: Response): Promise<Response> {
    const id = parseInt(req.params.id);
    const data: VisitStartDTO = req.body;

    try {
      await visitasPorGeoLocalizacaoService.iniciarVisita(id, data);
      return res.status(201).json({ message: "Visita iniciada!" });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ errors: "Erro interno do servidor!" });
    }
  },
  async finalizarVisita(req: Request, res: Response): Promise<Response> {
    const id = parseInt(req.params.id);
    const data: VisitEndDTO = req.body;

    if (isNaN(id)) {
      return res.status(400).json({ errors: "ID inválido!" });
    }

    try {
      const visita = await visitasPorGeoLocalizacaoService.finalizarVisita(
        id,
        data
      );
      return res.status(200).json(visita);
    } catch (e: any) {
      console.log(e);
      return res.status(500).json({ errors: "Erro interno do servidor!" });
    }
  },
  async visitasMarcadasChild(req: Request, res: Response): Promise<Response> {
    const childId = parseInt(req.params.id);
    if (isNaN(childId)) {
      return res.status(400).json({ errors: "ID inválido!" });
    }

    try {
      const visitas =
        await visitasPorGeoLocalizacaoService.visitasMarcadasChild(childId);
      return res.status(200).json(visitas);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ errors: "Erro interno do servidor!" });
    }
  },
  async update(req: Request, res: Response): Promise<Response> {
    const id = parseInt(req.params.id);
    const data: VisitUpdateDTO = req.body;
    console.log(data);
    try {
      await visitasPorGeoLocalizacaoService.update(id, data);
      return res
        .status(200)
        .json({ message: "Visita atualizada com sucesso!" });
    } catch (e: any) {
      console.log(e);
      return res.status(500).json({ errors: "Erro interno do servidor!" });
    }
  },
  async getAllForCoordenador(req: Request, res: Response): Promise<Response> {
    try {
      const visitas =
        await visitasPorGeoLocalizacaoService.getAllForCoordenador();
      return res.status(200).json(visitas);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ errors: "Erro interno do servidor!" });
    }
  },
};
