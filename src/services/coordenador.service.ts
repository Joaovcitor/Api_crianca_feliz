import { PrismaClient, UserRole, type User } from "@prisma/client";
const prisma = new PrismaClient();
export const CoordenadorService = {
  listarMeusSupervisores: async (coordenadorId: number): Promise<User[]> => {
    const user = await prisma.user.findUnique({
      where: { id: coordenadorId },
    });
    if (user?.role !== UserRole.coordenador) {
      throw new Error("Você não tem permissão para acessar este recurso!");
    }
    if (!coordenadorId) {
      throw new Error("É necessário estar logado!");
    }
    return await prisma.user.findMany({
      where: {
        coordenadorId: coordenadorId,
        role: UserRole.supervisor,
      },
    });
  },
  listarMeusVisitadores: async (coordenadorId: number): Promise<User[]> => {
    if (!coordenadorId) {
      throw new Error("É necessário estar logado!");
    }
    return await prisma.user.findMany({
      where: {
        coordenadorId: coordenadorId,
        role: UserRole.visitador,
      },
    });
  },
};
