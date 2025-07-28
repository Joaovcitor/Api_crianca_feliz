import { PrismaClient, Child } from "@prisma/client";
import { ChildCreateDTO } from "../dtos/ChildCreateDTO";
const prisma = new PrismaClient();
export const ChildService = {
  getAll: async (visitadorId: number): Promise<Child[]> => {
    if (!visitadorId) {
      throw new Error("Você precisa estar autenticado!");
    }

    const child = await prisma.child.findMany({
      where: { visitorId: visitadorId },
      include: {
        caregiver: true,
        visitor: true,
      },
    });

    return child;
  },
  getById: async (id: number, visitadorId: number): Promise<Child> => {
    if (!id) throw new Error("Id é necessário.");

    const child = await prisma.child.findUnique({ where: { id } });
    if (!child) throw new Error("Criança não encontrada!");
    if (child.visitorId !== visitadorId)
      throw new Error("Essa criança não pertence a você!");
    return child;
  },
  create: async (
    data: ChildCreateDTO,
    visitadorId: number,
    caregiverId: number
  ): Promise<Child> => {
    if (!visitadorId || !caregiverId)
      throw new Error("Está faltando seu ID ou o ID do cuidador!");

    const createChild = await prisma.child.create({
      data: {
        ...data,
        visitor: {
          connect: {
            id: visitadorId,
          },
        },
        caregiver: {
          connect: {
            id: caregiverId,
          },
        },
      },
    });
    return createChild;
  },
  validarCrianca: async (childId: number): Promise<Child> => {
    if (!childId) throw new Error("ID da criança é necessário!");

    const child = await prisma.child.findUnique({ where: { id: childId } });
    if (!child) throw new Error("Criança não encontrada!");

    return prisma.child.update({
      where: { id: childId },
      data: { isPending: false },
    });
  },
};
