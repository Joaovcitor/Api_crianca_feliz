import type { FaltasCreateDTO } from "./FaltasCreateDTO";
import type { FaltasPedirParaInvalidarFalta } from "./FaltasPedidoParaInvalidarDTO";
import type { InvalidarFaltaDTO } from "./InvalidarFaltaDTO";
import { FaltasService } from "./faltas.service";
import { Request, Response } from "express";

export const FaltasController = {
  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const faltas = await FaltasService.getAll();
      return res.status(200).json(faltas);
    } catch (e: any) {
      console.log(e);
      return res.status(500).json({ errors: "Erro interno do servidor!" });
    }
  },
  async getById(req: Request, res: Response): Promise<Response> {
    const id = parseInt(req.params.id, 10);

    try {
      const falta = await FaltasService.getById(id);
      return res.status(200).json(falta);
    } catch (e: any) {
      console.log(e);
      return res.status(500).json({ errors: "Erro interno do servidor!" });
    }
  },
  async create(req: Request, res: Response): Promise<Response> {
    const data: FaltasCreateDTO = req.body;
    const userId = parseInt(req.body.userId, 10);
    const recorderId = req.user?.id;
    if (!recorderId)
      return res
        .status(401)
        .json({ errors: "Você precisa estar autenticado!" });
    try {
      await FaltasService.create(data, userId, recorderId);
      return res.status(201).json({ message: "Falta criada com sucesso!" });
    } catch (e: any) {
      console.log(e);
      return res.status(500).json({ errors: "Erro interno do servidor!" });
    }
  },
  async faltasDoUsuarioLogado(req: Request, res: Response): Promise<Response> {
    const userId = req.user?.id;
    if (!userId)
      return res
        .status(401)
        .json({ errors: "Você precisa estar autenticado!" });
    try {
      const faltas = await FaltasService.faltasDoUsuarioLogado(userId);
      return res.status(200).json(faltas);
    } catch (e: any) {
      console.log(e);
      return res.status(500).json({ errors: "Erro interno do servidor!" });
    }
  },
  async pedirParaInvalidarFalta(
    req: Request,
    res: Response
  ): Promise<Response> {
    const data: FaltasPedirParaInvalidarFalta = req.body;
    const id = parseInt(req.params.id);

    try {
      await FaltasService.pedidoDeInvalidacaoDeFalta(id, data);
      return res
        .status(200)
        .json({ message: "Pedido de invalidação enviado!" });
    } catch (e: any) {
      console.log(e);
      return res.status(500).json({ errors: "Erro interno do servidor!" });
    }
  },
  async invalidarFalta(req: Request, res: Response): Promise<Response> {
    const id = parseInt(req.body.id, 10);
    const data: InvalidarFaltaDTO = req.body;
    try {
      await FaltasService.invalidarOuValidar(id, data);
      return res
        .status(200)
        .json({ message: "Operação realizada com sucesso!" });
    } catch (e: any) {
      console.log(e);
      return res.status(500).json({ errors: "Erro interno do servidor!" });
    }
  },
};
