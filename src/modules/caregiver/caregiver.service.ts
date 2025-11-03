import { PrismaClient, type Caregiver } from "@prisma/client";
import { CaregiverCreate } from "./CaregiverCreateDTO";
import type {
  CaregiverUpdate,
  CaregiverUpdatePregnant,
} from "./CaregiverUpdateDTO";
const prisma = new PrismaClient();

export const CaregiverService = {
  pickUpCaregiversFromTheVisitor: async (
    visitadorId: number
  ): Promise<Caregiver[]> => {
    if (!visitadorId) {
      throw new Error("Você precisa estar autenticado!");
    }

    const caregivers = await prisma.caregiver.findMany({
      where: { visitadorId: visitadorId },
      include: {
        children: true,
      },
    });
    return caregivers;
  },
  getAll: async (): Promise<Caregiver[]> => {
    const caregivers = await prisma.caregiver.findMany({
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

    const caregiver = await prisma.caregiver.findUnique({ where: { id: id } });
    return caregiver;
  },
  getByLoggedInVisitorID: async (visitadorId: number): Promise<Caregiver[]> => {
    const caregiver = await prisma.caregiver.findMany({
      where: { visitadorId: visitadorId },
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
    const createCaregiver = await prisma.caregiver.create({
      data: {
        ...data,
        visitor: {
          connect: {
            id: visitadorId,
          },
        },
      },
    });

    return createCaregiver;
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
};
