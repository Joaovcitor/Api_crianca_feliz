import { PrismaClient, User, UserRole } from "@prisma/client";
const prisma = new PrismaClient();

export const VisitadoresService = {
  getAll: async (supervisorId: number): Promise<User[]> => {
    return prisma.user.findMany({
      where: {
        role: UserRole.visitador,
        supervisorId: supervisorId,
      },
      include: {
        children: true,
        supervisor: true,
        visitorCaregivers: true,
        planosDeVisitas: true,
        visitasPorGeolocalizacaos: true,
      },
    });
  },
  getById: async (id: number, userId: number): Promise<User[]> => {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (user?.role === UserRole.visitador) {
      throw new Error("Você não tem permissão para acessar este recurso!");
    }
    return prisma.user.findMany({
      where: {
        role: UserRole.visitador,
        id: id,
      },
      include: {
        children: true,
        supervisor: true,
        visitorCaregivers: true,
        planosDeVisitas: true,
        visitasPorGeolocalizacaos: true,
      },
    });
  },
  desativarConta: async (visitadorId: number): Promise<User> => {
    const visitador = await prisma.user.findUnique({
      where: { id: visitadorId },
    });
    if (!visitador) {
      throw new Error("Visitador não encontrado");
    }

    return prisma.user.update({
      where: { id: visitadorId },
      data: { isActive: false },
    });
  },
  validar: async (
    visitadorId: number,
    coordenadorId: number
  ): Promise<User> => {
    const visitador = await prisma.user.findUnique({
      where: { id: visitadorId },
    });
    if (!visitador) {
      throw new Error("Visitador não encontrado");
    }

    return prisma.user.update({
      where: { id: visitadorId },
      data: { isPending: false, coordenadorId: coordenadorId },
    });
  },
  visitadoresDoSupervisor: async (supervisorId: number): Promise<User[]> => {
    const visitadores = await prisma.user.findMany({
      where: {
        isActive: true,
        isPending: false,
        role: UserRole.visitador,
        supervisorId: supervisorId,
      },
    });
    return visitadores;
  },
};
