import { PrismaClient, Child } from "@prisma/client";
import { ChildCreateDTO } from "./ChildCreateDTO";
import type { ChildUpdateDTO } from "./ChildUpdateDTO";
import { NotFoundError, UnauthorizedError } from "../../core/errors/appErrors";
const prisma = new PrismaClient();
export const ChildService = {
  getAll: async (visitadorId: number): Promise<Child[]> => {
    if (!visitadorId) {
      throw new UnauthorizedError("Você precisa estar autenticado!");
    }

    const child = await prisma.child.findMany({
      where: { visitorId: visitadorId, isActive: true },
      include: {
        caregiver: true,
        visitor: true,
      },
    });

    return child;
  },
  getById: async (id: number, userId: number): Promise<Child> => {
    if (!id) throw new Error("Id é necessário.");
    const user = await prisma.user.findUnique({ where: { id: userId } });

    const child = await prisma.child.findUnique({ where: { id } });
    if (!child) throw new NotFoundError("Criança não encontrada!");
    // if (user?.role !== "coordenador")
    //   throw new Error("Você não tem autorização para usar esse recurso!");
    return child;
  },
  update: async (id: number, data: ChildUpdateDTO): Promise<Child> => {
    if (!id) throw new Error("Id é necessário.");
    const child = await prisma.child.findUnique({ where: { id } });
    if (!child) throw new NotFoundError("Criança não encontrada!");
    return prisma.child.update({
      where: { id },
      data,
    });
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
    if (!child) throw new NotFoundError("Criança não encontrada!");

    return prisma.child.update({
      where: { id: childId },
      data: { isPending: false },
    });
  },
  listarCriancasParaCoordenador: async (): Promise<Child[]> => {
    return prisma.child.findMany({
      where: { isPending: true },
      include: {
        caregiver: true,
        visitor: true,
        visitPlans: true,
        geoLocatedVisits: true,
      },
    });
  },
  delete: async (id: number): Promise<Child> => {
    if (!id) {
      throw new Error("ID inválido!");
    }
    const child = await prisma.child.findUnique({ where: { id: id } });
    if (!child) {
      throw new NotFoundError("Criança não encontrada!");
    }
    return prisma.child.update({
      where: { id: id },
      data: { isActive: false },
    });
  },
};
