import { PrismaClient, type Caregiver } from "@prisma/client";
import { CaregiverCreate } from "./CaregiverCreateDTO";
import type {
  CaregiverUpdate,
  CaregiverUpdatePregnant,
} from "./CaregiverUpdateDTO";
import { ConflictError } from "../../core/errors/appErrors";
const prisma = new PrismaClient();

export const CaregiverService = {
  pickUpCaregiversFromTheVisitor: async (
    visitadorId: number
  ): Promise<Caregiver[]> => {
    if (!visitadorId) {
      throw new Error("Você precisa estar autenticado!");
    }

    const caregivers = await prisma.caregiver.findMany({
      where: { visitadorId: visitadorId, isActive: true },
      include: {
        children: true,
      },
    });
    return caregivers;
  },
  pickUpCaregiversFromTheSupervisor: async (
    id: number
  ): Promise<Caregiver[]> => {
    const caregivers = await prisma.caregiver.findMany({
      where: { supervisorId: id },
      include: {
        children: true,
        visitor: true,
      },
    });
    return caregivers;
  },
  getAll: async (): Promise<Caregiver[]> => {
    const caregivers = await prisma.caregiver.findMany({
      where: { isActive: true },
      include: {
        children: true,
        visitor: true,
      },
    });
    return caregivers;
  },
  getById: async (id: number): Promise<Caregiver | null> => {
    if (!id) {
      throw new Error("ID é obrigatório!");
    }

    const caregiver = await prisma.caregiver.findUnique({
      where: { id: id },
      include: {
        children: {
          select: {
            name: true,
            isBpc: true,
            born: true,
          },
        },
      },
    });
    return caregiver;
  },
  getByLoggedInVisitorID: async (visitadorId: number): Promise<Caregiver[]> => {
    const caregiver = await prisma.caregiver.findMany({
      where: { visitadorId: visitadorId, isActive: true },
    });

    if (!caregiver) {
      throw new Error("Não existem cuidadores!");
    }

    return caregiver;
  },

  create: async (
    data: CaregiverCreate,
    visitadorId: number
  ): Promise<Caregiver> => {
    const result = await prisma.$transaction(async (tsx) => {
      const findUser = await tsx.user.findUnique({
        where: { id: visitadorId },
      });
      const caregiver = await tsx.caregiver.findFirst({
        where: { cpf: data.cpf },
      });
      if (caregiver) {
        throw new ConflictError("Cuidador já cadastrado!");
      }
      const createCaregiver = await tsx.caregiver.create({
        data: {
          ...data,
          visitor: {
            connect: {
              id: visitadorId,
            },
          },
          supervisor: {
            connect: {
              id: findUser?.supervisorId!,
            },
          },
        },
      });
      return createCaregiver;
    });

    return result;
  },
  update: async (id: number, data: CaregiverUpdate): Promise<Caregiver> => {
    const updatedCaregiver = await prisma.caregiver.update({
      where: { id: id },
      data: {
        ...data,
      },
    });
    return updatedCaregiver;
  },
  updatePregnant: async (
    id: number,
    data: CaregiverUpdatePregnant
  ): Promise<Caregiver> => {
    const updatedCaregiver = await prisma.caregiver.update({
      where: { id: id },
      data: {
        ...data,
      },
    });
    return updatedCaregiver;
  },
  delete: async (id: number): Promise<Caregiver> => {
    if (!id) {
      throw new Error("ID é obrigatório!");
    }
    const caregiver = await prisma.caregiver.findUnique({ where: { id: id } });
    if (!caregiver) {
      throw new Error("Cuidador não encontrado!");
    }
    return prisma.caregiver.update({
      where: { id: id },
      data: { isActive: false },
    });
  },
  validarCaregiver: async (
    id: number,
    supervisorId: number
  ): Promise<Caregiver> => {
    const caregiver = await prisma.caregiver.findUnique({ where: { id: id } });
    if (!caregiver) {
      throw new Error("Cuidador não encontrado!");
    }
    return prisma.caregiver.update({
      where: { id: id },
      data: { isPending: false, isActive: true, supervisorId: supervisorId },
    });
  },
};
