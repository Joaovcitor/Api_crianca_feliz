import { BadRequestError } from "../../core/errors/appErrors";
import { prisma } from "./../../core/prisma/prisma";
import type { CreateFormDto } from "./forms.dto";

export const FormsService = {
  create: async (data: CreateFormDto, userId: number) => {
    await prisma.modelosDeFormularios.findFirst({
      where: { tipo: data.tipo },
    });
    return prisma.modelosDeFormularios.create({
      data: {
        ...data,
        userId,
      },
    });
  },
  getAll: async () => {
    return prisma.modelosDeFormularios.findMany();
  },
  getById: async (id: number) => {
    if (!id) {
      throw new BadRequestError("ID do formulário é obrigatório");
    }
    return prisma.modelosDeFormularios.findFirst({
      where: { id },
    });
  },
};
