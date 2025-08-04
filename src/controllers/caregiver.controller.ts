import { Request, Response } from "express";
import { CaregiverService } from "../services/caregiver.service";
import { CaregiverCreate } from "../dtos/CaregiverCreateDTO";
import type { CaregiverResponse } from "../dtos/CaregiverResponseDTO";

export const CaregiverController = {
  // criar uma lógica mais robusta na busca dos dados, para que visitadores não acessem essa rota!
  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const caregivers = await CaregiverService.getAll();
      if (!caregivers) {
        return res.status(404).json({ errors: "Não há cuidadores" });
      }
      return res.status(200).json(caregivers);
    } catch (e: any) {
      console.log(e);
      return res.status(500).json({ errors: "Ocorreu um erro desconhecido!" });
    }
  },
  async create(req: Request, res: Response): Promise<Response> {
    const {
      name,
      cpf,
      address,
      district,
      contact,
      born,
      pregnant,
    }: CaregiverCreate = req.body;
    const visitadorId = req.user?.id;
    if (!visitadorId)
      return res.status(401).json({ errors: "Você precisa estar autenticado" });
    try {
      const newCaregiver = await CaregiverService.create(
        { name, cpf, address, district, contact, born, pregnant },
        visitadorId
      );
      const caregiverResponse: CaregiverResponse = {
        id: newCaregiver.id,
        name: newCaregiver.name,
      };
      return res.status(201).json(caregiverResponse);
    } catch (e: unknown) {
      console.log(e);
      return res.status(500).json({ errors: "Erro interno do servidor!" });
    }
  },
  async caregiversDoVisitador(req: Request, res: Response): Promise<Response> {
    const visitadorId = req.user?.id;

    if (!visitadorId)
      return res.status(401).json({ errors: "Você tem que estar autenticado" });

    try {
      const caregivers = await CaregiverService.getByLoggedInVisitorID(
        visitadorId
      );
      return res.status(200).json(caregivers);
    } catch (e: unknown) {
      console.log(e);
      return res.status(500).json({ errors: "Erro interno do servidor!" });
    }
  },
  async getById(req: Request, res: Response): Promise<Response> {
    const id = parseInt(req.params.id, 10);
    try {
      const caregiver = await CaregiverService.getById(id);
      if (!caregiver)
        return res.status(404).json({ errors: "Cuidador não encontrado!" });
      return res.status(200).json(caregiver);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ errors: "Erro interno do servidor!" });
    }
  },
};
