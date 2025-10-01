import { Request, Response } from "express";
import { ChildService } from "./child.service";
import { ChildCreateDTO } from "./ChildCreateDTO";
import type { ChildUpdateDTO } from "./ChildUpdateDTO";

export const ChildController = {
  async getAll(req: Request, res: Response): Promise<Response> {
    const visitadorId = req.user?.id;
    if (!visitadorId)
      return res
        .status(401)
        .json({ errors: "Você tem que estar autenticado!" });
    try {
      const child = await ChildService.getAll(visitadorId);
      return res.status(200).json(child);
    } catch (e: unknown) {
      console.log(e);
      return res.status(500).json({ errors: "Erro interno do Servidor!" });
    }
  },
  async getById(req: Request, res: Response): Promise<Response> {
    const id = parseInt(req.params.id, 10);
    const visitadorId = req.user?.id;
    if (!visitadorId)
      return res.status(401).json({ errors: "Você tem que está autenticado!" });
    try {
      const child = await ChildService.getById(id, visitadorId);
      return res.status(200).json(child);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ errors: "Erro interno do Servidor!" });
    }
  },
  async create(req: Request, res: Response): Promise<Response> {
    const { name, born, isBpc, nis }: ChildCreateDTO = req.body;
    const caregiverId = parseInt(req.params.id, 10);
    const visitadorId = req.user?.id;
    if (!visitadorId)
      return res
        .status(401)
        .json({ errors: "Você precisa estar autenticado!" });
    if (!caregiverId)
      return res.status(400).json({ errors: "ID da cuidadora é necessário!" });

    try {
      await ChildService.create(
        { name, born, isBpc, nis },
        visitadorId,
        caregiverId
      );

      return res.status(201).json({ message: "Criança criada com sucesso!" });
    } catch (e: unknown) {
      console.log(e);
      return res.status(500).json({ errors: "Erro interno do servidor!" });
    }
  },
  async listarCriancasParaCoordenador(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const criancas = await ChildService.listarCriancasParaCoordenador();
      return res.status(200).json(criancas);
    } catch (e: unknown) {
      console.log(e);
      return res.status(500).json({ errors: "Erro interno do servidor!" });
    }
  },
  async update(req: Request, res: Response): Promise<Response> {
    const id = parseInt(req.params.id, 10);
    const { name, born, nis }: ChildUpdateDTO = req.body;
    const visitadorId = req.user?.id;
    if (!visitadorId)
      return res
        .status(401)
        .json({ errors: "Você precisa estar autenticado!" });
    try {
      await ChildService.update(id, { name, born, nis });
      return res
        .status(200)
        .json({ message: "Criança atualizada com sucesso!" });
    } catch (e: unknown) {
      console.log(e);
      return res.status(500).json({ errors: "Erro interno do servidor!" });
    }
  },
  async delete(req: Request, res: Response): Promise<Response> {
    const id = parseInt(req.params.id, 10);
    const visitadorId = req.user?.id;
    if (!visitadorId)
      return res
        .status(401)
        .json({ errors: "Você precisa estar autenticado!" });
    try {
      await ChildService.delete(id);
      return res.status(200).json({ message: "Criança excluída com sucesso!" });
    } catch (e: unknown) {
      console.log(e);
      return res.status(500).json({ errors: "Erro interno do servidor!" });
    }
  },
};
