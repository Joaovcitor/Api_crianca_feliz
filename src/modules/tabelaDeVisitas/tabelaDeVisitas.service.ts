import {
  PrismaClient,
  TabelaDeVisitas,
  type Prisma,
  type TabelaVisitaDia,
  type TabelaVisitaPeriodo,
} from "@prisma/client";
import type { TabelaDeVisitasCreateDTO } from "./TabelaDeVisitasCreateDTO";
import type { TabelaDeVisitasUpdateDTO } from "./TabelaDeVisitasUpdateDTO";
const prisma = new PrismaClient();

export const TabelaDeVisitasService = {
  getAll: async (): Promise<TabelaDeVisitas[]> => {
    return prisma.tabelaDeVisitas.findMany({
      include: {
        caregiver: true,
        visitor: true,
      },
    });
  },
  getById: async (id: number): Promise<TabelaDeVisitas> => {
    const tabela = await prisma.tabelaDeVisitas.findUnique({ where: { id } });
    if (!tabela) throw new Error("Tabela não encontrada!");
    return tabela;
  },
  create: async (
    data: TabelaDeVisitasCreateDTO,
    visitadorId: number,
    childId: number | null,
    caregiverId: number | null
  ): Promise<TabelaDeVisitas> => {
    const dadosDoPrisma: Prisma.TabelaDeVisitasCreateInput = {
      dateOfVisit: data.dateOfVisit,
      childVisited: data.childVisited,
      dayOfVisit: data.dayOfVisit as TabelaVisitaDia,
      period: data.period as TabelaVisitaPeriodo,

      visitor: {
        connect: { id: visitadorId },
      },
      ...(childId && { childId: { connect: { id: childId } } }),
      ...(caregiverId && { caregiverId: { connect: { id: caregiverId } } }),
    };

    return prisma.tabelaDeVisitas.create({
      data: dadosDoPrisma,
    });
  },
  update: async (
    id: number,
    data: TabelaDeVisitasUpdateDTO
  ): Promise<TabelaDeVisitas> => {
    const dataForPrisma = {
      dateOfVisit: data.dateOfVisit,
      dayOfVisit: data.dayOfVisit as TabelaVisitaDia,
      period: data.period as TabelaVisitaPeriodo,
    };
    return prisma.tabelaDeVisitas.update({
      where: { id },
      data: dataForPrisma,
    });
  },
};
