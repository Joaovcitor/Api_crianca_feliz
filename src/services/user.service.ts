import { PrismaClient, UserRole, User, Prisma } from "@prisma/client";
import { hashPassword } from "./users/senha";
import type { UserUpdatePasswordDTO } from "../dtos/UserUpdatePasswordDTO";
import type { UserUpdateEmailDTO } from "../dtos/UserUpdateEmailDTO";
const prisma = new PrismaClient();

interface FilterOptions {
  startDate?: string;
  endDate?: string;
}

type UserCreateData = Prisma.UserCreateInput;
type UserUpdateData = Prisma.UserUpdateInput;

export const UserService = {
  getAll: async (filters?: FilterOptions): Promise<User[]> => {
    const includeOptions: Prisma.UserInclude = {
      coordinator: true,
      supervisor: true,
      children: true,
      coordinated: true,
      visitorCaregivers: true,
    };
    const hasDateFilter = filters?.startDate || filters?.endDate;

    if (hasDateFilter) {
      const inclusiveEndDate = new Date(`${filters.endDate}T23:59:59.999Z`);

      includeOptions.planosDeVisitas = {
        where: {
          createdAt: {
            gte: new Date(filters.startDate as string),
            lte: inclusiveEndDate,
          },
        },
      };
      includeOptions.visitasPorGeolocalizacaos = {
        where: {
          createdAt: {
            gte: new Date(filters.startDate as string),
            lte: inclusiveEndDate,
          },
        },
      };
    }

    return prisma.user.findMany({
      include: includeOptions,
    });
  },

  getById: async (
    id: number,
    filters?: FilterOptions
  ): Promise<User | null> => {
    const includeOptions: Prisma.UserInclude = {
      coordinator: true,
      supervisor: true,
      children: true,
      coordinated: true,
    };
    const hasDateFilter = filters?.startDate || filters?.endDate;

    if (hasDateFilter) {
      const inclusiveEndDate = new Date(`${filters.endDate}T23:59:59.999Z`);

      includeOptions.planosDeVisitas = {
        where: {
          createdAt: {
            gte: new Date(filters.startDate as string),
            lte: inclusiveEndDate,
          },
        },
      };
    }

    return prisma.user.findUnique({
      where: { id },
      include: includeOptions,
    });
  },
  createCoordenador: async (
    data: Omit<Prisma.UserCreateInput, "role">
  ): Promise<User> => {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: data.email }, { cpf: data.cpf }],
      },
    });

    if (existingUser) {
      throw new Error("Já existe um usuário com esse email ou cpf.");
    }

    const hashedPassword = await hashPassword(data.password);
    const newUser = await prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
        role: UserRole.coordenador,
        isActive: true,
      },
    });
    return newUser;
  },
  createVisitador: async (
    data: Omit<Prisma.UserCreateInput, "role">,
    supervisorId: number
  ): Promise<User> => {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: data.email }, { cpf: data.cpf }],
      },
    });

    if (existingUser) {
      throw new Error("Visitador já existe com esse email ou cpf.");
    }

    const visitadorCount = await prisma.user.count({
      where: {
        role: UserRole.visitador,
        supervisorId: supervisorId,
      },
    });
    if (visitadorCount >= 10) {
      throw new Error("Supervisor já possui 10 visitadores.");
    }

    const hashedPassword = await hashPassword(data.password);
    const newUser = await prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
        role: UserRole.visitador,
        isActive: true,
        supervisor: {
          connect: {
            id: supervisorId,
          },
        },
      },
    });
    return newUser;
  },
  createSupervisor: async (
    data: Omit<Prisma.UserCreateInput, "role">,
    coordenadorId: number
  ): Promise<User> => {
    const supervisorData = { ...data, role: UserRole.supervisor };
    const hashedPassword = await hashPassword(data.password);

    return prisma.user.create({
      data: {
        ...supervisorData,
        password: hashedPassword,
        isActive: true,
        coordinator: {
          connect: {
            id: coordenadorId,
          },
        },
      },
    });
  },
  updatePassword: async (
    id: number,
    data: UserUpdatePasswordDTO
  ): Promise<User> => {
    const existingUser = await prisma.user.findUnique({ where: { id } });
    if (!existingUser) {
      throw new Error("Usuário não encontrado.");
    }
    return prisma.user.update({
      where: { id },
      data: { password: await hashPassword(data.password) },
    });
  },
  updateEmail: async (id: number, data: UserUpdateEmailDTO): Promise<User> => {
    const existingUser = await prisma.user.findUnique({ where: { id } });
    if (!existingUser) {
      throw new Error("Usuário não encontrado.");
    }

    if (existingUser.email === data.email) {
      throw new Error("Já existe um usuário com esse email.");
    }
    return prisma.user.update({
      where: { id },
      data: { email: data.email },
    });
  },
  update: async (id: number, data: UserUpdateData): Promise<User> => {
    return prisma.user.update({
      where: { id },
      data,
    });
  },
  delete: async (id: number): Promise<User | null> => {
    return prisma.user.delete({
      where: { id },
    });
  },
};
