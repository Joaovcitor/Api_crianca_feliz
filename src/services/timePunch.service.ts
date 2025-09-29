import { PrismaClient, type PunchType, type TimePunch } from "@prisma/client";
const prisma = new PrismaClient();

export const timePunchService = {
  create: async (
    userId: number,
    type: string,
    latitude: number,
    longitude: number,
    notes?: string
  ) => {
    return prisma.timePunch.create({
      data: {
        userId,
        timestamp: new Date(),
        type: type as PunchType,
        latitude,
        longitude,
        notes,
      },
    });
  },
  getAllForUserLoggedOrByIdUrl: async (
    userId: number
  ): Promise<TimePunch[]> => {
    const timesPunch = prisma.timePunch.findMany({
      where: {
        userId,
      },
      orderBy: {
        timestamp: "desc",
      },
    });
    return timesPunch;
  },
};
