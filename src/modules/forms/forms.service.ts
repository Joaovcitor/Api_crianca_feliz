import { BadRequestError } from "../../core/errors/appErrors";
import { prisma } from "./../../core/prisma/prisma";
import type { CreateFormDto } from "./forms.dto";

export const FormsService = {
  create: async (data: CreateFormDto, userId: number) => {
    const modeloExist = await prisma.modelosDeFormularios.findFirst({
      where: { tipo: data.tipo },
    });
    if (modeloExist) {
      throw new BadRequestError("Modelo de formulário já existe");
    }
    return prisma.modelosDeFormularios.create({
      data: {
        ...data,
        userId,
      },
    });
  },
};
