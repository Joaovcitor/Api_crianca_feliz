import type { Prisma } from "@prisma/client";
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
  registrarForm: async (
    formId: number,
    respostas: any,
    userId: number,
    childId?: number,
    caregiverId?: number
  ) => {
    if (!childId && !caregiverId) {
      throw new BadRequestError("É necessário fornecer childId ou caregiverId");
    }
    const data: Prisma.RegistroDeFormulariosCreateInput = {
      respostas,
      modelo: { connect: { id: formId } },
      visitor: { connect: { id: userId } },
    };
    if (childId) {
      data.child = { connect: { id: childId } };
    }
    if (caregiverId) {
      data.caregiver = { connect: { id: caregiverId } };
    }
    return prisma.registroDeFormularios.create({
      data,
    });
  },
  getFormsChild: async (childId: number) => {
    const forms = await prisma.registroDeFormularios.findMany({
      where: { childId: childId },
      include: { modelo: true },
    });
    return forms;
  },
};
