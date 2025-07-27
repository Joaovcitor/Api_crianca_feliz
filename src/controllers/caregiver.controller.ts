import { Request, Response } from "express";
import { CaregiverService } from "../services/caregiver.service";
import { CaregiverCreate } from "../dtos/CaregiverCreateDTO";
import type { CaregiverResponse } from "../dtos/CaregiverResponseDTO";

export const CaregiverController = {
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
      nis,
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
        { name, cpf, nis, address, district, contact, born, pregnant },
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
};
