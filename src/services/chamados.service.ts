import {
  PrismaClient,
  type Chamado,
  type ChamadoType,
  type Prisma,
} from "@prisma/client";
import type { ChamadosCreateDTO } from "../dtos/ChamadoCreateDTO";
const prisma = new PrismaClient();

export const ChamadosService = {
  getAll: async (): Promise<Chamado[]> => {
    return await prisma.chamado.findMany({
      include: {
        author: true,
        recipient: true,
      },
    });
  },
  getById: async (id: number): Promise<Chamado | null> => {
    if (!id) {
      throw new Error("Id é necessário!");
    }
    return await prisma.chamado.findUnique({ where: { id: id } });
  },
  create: async (userId: number, data: ChamadosCreateDTO): Promise<Chamado> => {
    const dadosForPrisma: Prisma.ChamadoCreateInput = {
      description: data.description,
      type: data.type as ChamadoType,
      author: {
        connect: {
          id: userId,
        },
      },
    };
    return await prisma.chamado.create({ data: dadosForPrisma });
  },
};
