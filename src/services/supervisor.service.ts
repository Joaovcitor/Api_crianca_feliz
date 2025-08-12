import { PrismaClient, type User } from "@prisma/client";

const prisma = new PrismaClient();

export const SupervisorService = {
  getVisitadoresDoSupervisor: async (supervisorId: number): Promise<User[]> => {
    const visitadores = await prisma.user.findMany({
      where: { supervisorId },
    });
    return visitadores;
  },
};
