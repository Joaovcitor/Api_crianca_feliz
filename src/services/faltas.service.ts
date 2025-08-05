import { PrismaClient, type Falta, type Prisma } from "@prisma/client";
import type { FaltasCreateDTO } from "../dtos/FaltasCreateDTO";
import type { FaltasPedirParaInvalidarFalta } from "../dtos/FaltasPedidoParaInvalidarDTO";
import type { InvalidarFaltaDTO } from "../dtos/InvalidarFaltaDTO";

const prisma = new PrismaClient();

export const FaltasService = {
  getAll: async (): Promise<Falta[]> => {
    return await prisma.falta.findMany({
      include: {
        user: true,
      },
    });
  },
  getById: async (id: number): Promise<Falta | null> => {
    return await prisma.falta.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });
  },
  create: async (
    data: FaltasCreateDTO,
    userId: number,
    recorderId: number
  ): Promise<Falta> => {
    const dataForPrisma: Prisma.FaltaCreateInput = {
      reason: data.reason,
      occurrenceDate: data.occurrenceDate,
      user: {
        connect: { id: userId },
      },
      recorder: {
        connect: { id: recorderId },
      },
    };
    return await prisma.falta.create({
      data: dataForPrisma,
    });
  },
  faltasDoUsuarioLogado: async (userId: number): Promise<Falta[]> => {
    return await prisma.falta.findMany({
      where: { userId: userId },
      include: {
        user: true,
        recorder: true,
      },
    });
  },
  pedidoDeInvalidacaoDeFalta: async (
    id: number,
    data: FaltasPedirParaInvalidarFalta
  ): Promise<Falta> => {
    if (!id) throw new Error("ID é necessário!");
    return await prisma.falta.update({
      where: { id },
      data: {
        invalidationRequest: data.invalidationRequest,
      },
    });
  },
  invalidarFalta: async (
    id: number,
    data: InvalidarFaltaDTO
  ): Promise<Falta> => {
    if (!id) {
      throw new Error("ID é obrigatório!");
    }
    const dataForPrisma: Prisma.FaltaUpdateInput = {
      isJustified: data.isJustified,
      justificationReason: data.justificationReason,
      isInvalidated: data.isInvalidated,
    };
    return prisma.falta.update({
      where: {
        id,
      },
      data: dataForPrisma,
    });
  },
};
