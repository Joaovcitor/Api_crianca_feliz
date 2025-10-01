import {
  PrismaClient,
  PlanoDeVisitas,
  type Prisma,
  type PlanoVisitaRealizacao,
} from "@prisma/client";
import type { PlanoDeVisitaCreateDTO } from "./PlanoDeVisitaDTO";
import type { PlanoDeVisitaUpdate } from "./PlanoDeVisitaUpdateDTO";
import { PaginationParams } from "../../core/interfaces/PaginationParams";
const prisma = new PrismaClient();

export const PlanosDeVisitaService = {
  getAll: async ({
    visitadorId,
    page = 1,
    pageSize = 10,
    childId,
  }: {
    visitadorId: number;
    page?: number;
    pageSize?: number;
    childId: number;
  }): Promise<{
    data: PlanoDeVisitas[];
    meta: {
      total: number;
      page: number;
      pageSize: number;
      totalPages: number;
    };
  }> => {
    const skip = (page - 1) * pageSize;
    const [total, planos] = await prisma.$transaction([
      prisma.planoDeVisitas.count({
        where: {
          visitorId: visitadorId,
          childId: childId,
        },
      }),
      prisma.planoDeVisitas.findMany({
        where: {
          visitorId: visitadorId,
          childId: childId,
        },
        include: {
          visitor: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: pageSize,
        skip: skip,
      }),
    ]);
    const totalPages = Math.ceil(total / pageSize);
    return {
      data: planos,
      meta: {
        total,
        page,
        pageSize,
        totalPages,
      },
    };
  },
  getById: async (id: number): Promise<PlanoDeVisitas | null> => {
    return prisma.planoDeVisitas.findUnique({
      where: { id },
      include: {
        geoLocatedVisits: true,
      },
    });
  },
  createPlanoForChild: async (
    data: PlanoDeVisitaCreateDTO,
    visitadorId: number,
    childId: number
  ): Promise<PlanoDeVisitas> => {
    const dadosParaPrisma: Prisma.PlanoDeVisitasCreateInput = {
      objective: data.objective,
      etapa1: data.etapa1,
      etapa2: data.etapa2,
      etapa3: data.etapa3,
      scheduledDay: data.scheduledDay,
      visitor: {
        connect: { id: visitadorId },
      },
      child: {
        connect: { id: childId },
      },
    };

    const result = await prisma.$transaction(async (tx) => {
      const plano = await tx.planoDeVisitas.create({
        data: dadosParaPrisma,
      });
      const visita = await tx.visitaPorGeolocalizacao.create({
        data: {
          planId: plano.id,
          scheduledDate: plano.scheduledDay,
          childId: plano.childId ?? null,
          caregiverId: plano.caregiverId ?? null,
        },
      });
      return { plano, visita };
    });

    return result.plano;
  },
  createPlanosForPregnant: async (
    data: PlanoDeVisitaCreateDTO,
    visitadorId: number,
    caregiverId: number
  ): Promise<PlanoDeVisitas> => {
    const dadosParaPrisma: Prisma.PlanoDeVisitasCreateInput = {
      objective: data.objective,
      etapa1: data.etapa1,
      etapa2: data.etapa2,
      etapa3: data.etapa3,
      scheduledDay: data.scheduledDay,
      visitor: {
        connect: { id: visitadorId },
      },
      caregiver: {
        connect: { id: caregiverId },
      },
    };

    const plano = await prisma.planoDeVisitas.create({
      data: dadosParaPrisma,
    });
    return plano;
  },
  updatePlanoPosVisita: async (
    id: number,
    data: PlanoDeVisitaUpdate
  ): Promise<PlanoDeVisitas> => {
    return prisma.planoDeVisitas.update({
      where: { id },
      data: {
        observation: data.observation,
        realizationStatus: data.realizationStatus as PlanoVisitaRealizacao,
      },
    });
  },
};
