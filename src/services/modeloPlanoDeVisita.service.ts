import {
  PrismaClient,
  type ModeloPlanoDeVisitas,
  type Prisma,
} from "@prisma/client";
import type { ModeloPlanoDeVisitaDTOCreate } from "../dtos/ModeloPlanoDeVisitaDTO";
import type { UpdateModeloPlanoDeVisitasDTO } from "../dtos/UpdateModeloPlanoDeVisitaDTO";
const prisma = new PrismaClient();

export const ModeloPlanoDeVisitasService = {
  create: async (
    data: ModeloPlanoDeVisitaDTOCreate
  ): Promise<ModeloPlanoDeVisitas> => {
    const dataForPrisma: Prisma.ModeloPlanoDeVisitasCreateInput = {
      faixaEtaria: data.faixaEtaria,
      objetivo: data.objetivo,
      etapa1: data.etapa1,
      etapa2: data.etapa2,
      etapa3: data.etapa3,
    };
    return await prisma.modeloPlanoDeVisitas.create({
      data: dataForPrisma,
    });
  },

  getAll: async (): Promise<ModeloPlanoDeVisitas[]> => {
    return await prisma.modeloPlanoDeVisitas.findMany();
  },
  getById: async (id: number): Promise<ModeloPlanoDeVisitas> => {
    if (!id) {
      throw new Error("Id é necessário");
    }

    const modelo = await prisma.modeloPlanoDeVisitas.findUnique({
      where: {
        id,
      },
    });
    if (!modelo) {
      throw new Error("Modelo não encontrado");
    }
    return modelo;
  },
  update: async (
    id: number,
    data: UpdateModeloPlanoDeVisitasDTO
  ): Promise<ModeloPlanoDeVisitas> => {
    if (!id) {
      throw new Error("Id é necessário");
    }
    const modelo = await prisma.modeloPlanoDeVisitas.update({
      where: { id },
      data,
    });
    return modelo;
  },
};
