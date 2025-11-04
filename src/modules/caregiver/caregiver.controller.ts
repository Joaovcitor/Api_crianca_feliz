import { Request, Response } from "express";
import { CaregiverService } from "./caregiver.service";
import { CaregiverCreate } from "./CaregiverCreateDTO";
import type { CaregiverResponse } from "./CaregiverResponseDTO";
import type {
  CaregiverUpdate,
  CaregiverUpdatePregnant,
} from "./CaregiverUpdateDTO";
import { NotFoundError } from "../../core/errors/appErrors";

export const CaregiverController = {
  // criar uma lógica mais robusta na busca dos dados, para que visitadores não acessem essa rota!
  async getAll(req: Request, res: Response): Promise<Response> {
    const caregivers = await CaregiverService.getAll();
    return res.status(200).json(caregivers);
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
    const newCaregiver = await CaregiverService.create(
      { name, cpf, address, district, contact, born, pregnant },
      visitadorId!
    );
    const caregiverResponse: CaregiverResponse = {
      id: newCaregiver.id,
      name: newCaregiver.name,
    };
    return res.status(201).json(caregiverResponse);
  },
  async caregiversDoVisitador(req: Request, res: Response): Promise<Response> {
    const visitadorId = req.user?.id;

    const caregivers = await CaregiverService.getByLoggedInVisitorID(
      visitadorId!
    );
    return res.status(200).json(caregivers);
  },
  async getById(req: Request, res: Response): Promise<Response> {
    const id = parseInt(req.params.id, 10);
    const caregiver = await CaregiverService.getById(id);
    if (!caregiver) {
      throw new NotFoundError("Cuidadora não encontrada!");
    }
    return res.status(200).json(caregiver);
  },
  async update(req: Request, res: Response): Promise<Response> {
    const id = parseInt(req.params.id, 10);
    const data: CaregiverUpdate = req.body;
    const updatedCaregiver = await CaregiverService.update(id, data);
    return res.status(200).json(updatedCaregiver);
  },
  async updatePregnant(req: Request, res: Response): Promise<Response> {
    const id = parseInt(req.params.id, 10);
    const data: CaregiverUpdatePregnant = req.body;

    const updatedCaregiver = await CaregiverService.updatePregnant(id, data);
    return res.status(200).json(updatedCaregiver);
  },
  async delete(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);
    const deletedCaregiver = await CaregiverService.delete(id);
    res.status(200).json(deletedCaregiver);
  },
  async validarCaregiver(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);
    const supervisorId = req.user?.id;
    const validarCaregiver = await CaregiverService.validarCaregiver(
      id,
      supervisorId!
    );
    res.status(200).json(validarCaregiver);
  },
  async pickUpCaregiversFromTheSupervisor(req: Request, res: Response) {
    const id = req.user?.id;
    const caregivers = await CaregiverService.pickUpCaregiversFromTheSupervisor(
      id!
    );
    res.status(200).json(caregivers);
  },
};
