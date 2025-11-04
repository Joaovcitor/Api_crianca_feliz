import { Request, Response } from "express";
import { ChildService } from "./child.service";
import { ChildCreateDTO } from "./ChildCreateDTO";
import type { ChildUpdateDTO } from "./ChildUpdateDTO";
import {
  BadRequestError,
  UnauthorizedError,
} from "../../core/errors/appErrors";

export const ChildController = {
  async getAll(req: Request, res: Response): Promise<Response> {
    const visitadorId = req.user?.id;
    const child = await ChildService.getAll(visitadorId!);
    return res.status(200).json(child);
  },
  async getById(req: Request, res: Response): Promise<Response> {
    const id = parseInt(req.params.id, 10);
    const visitadorId = req.user?.id;
    const child = await ChildService.getById(id, visitadorId!);
    return res.status(200).json(child);
  },
  async create(req: Request, res: Response): Promise<Response> {
    const { name, born, isBpc, nis }: ChildCreateDTO = req.body;
    const caregiverId = parseInt(req.params.id, 10);
    const visitadorId = req.user?.id;
    if (!caregiverId) {
      throw new BadRequestError("ID da cuidadora é necessário!");
    }
    await ChildService.create(
      { name, born, isBpc, nis },
      visitadorId!,
      caregiverId
    );

    return res.status(201).json({ message: "Criança criada com sucesso!" });
  },
  async listarCriancasParaCoordenador(
    req: Request,
    res: Response
  ): Promise<Response> {
    const criancas = await ChildService.listarCriancasParaCoordenador();
    return res.status(200).json(criancas);
  },
  async update(req: Request, res: Response): Promise<Response> {
    const id = parseInt(req.params.id, 10);
    const { name, born, nis }: ChildUpdateDTO = req.body;
    const visitadorId = req.user?.id;
    if (!visitadorId) {
      throw new BadRequestError("Você precisa estar autenticado!");
    }
    await ChildService.update(id, { name, born, nis });
    return res.status(200).json({ message: "Criança atualizada com sucesso!" });
  },
  async delete(req: Request, res: Response): Promise<Response> {
    const id = parseInt(req.params.id, 10);
    const visitadorId = req.user?.id;
    if (!visitadorId)
      throw new UnauthorizedError("Você precisa estar autenticado!");
    await ChildService.delete(id);
    return res.status(200).json({ message: "Criança excluída com sucesso!" });
  },
};
