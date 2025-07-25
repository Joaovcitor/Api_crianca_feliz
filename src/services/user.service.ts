import { connect } from "http2";
import { PrismaClient, UserRole, User, Prisma } from "./../generated/prisma";
import { hashPassword } from "./users/senha";
const prisma = new PrismaClient();

type UserCreateData = Prisma.UserCreateInput;
type UserUpdateData = Prisma.UserUpdateInput;

export const UserService = {
  getAll: async (): Promise<User[]> => {
    return prisma.user.findMany({
      include: {
        supervisor: true,
        coordinator: true,
      },
    });
  },

  getById: async (id: number): Promise<User | null> => {
    return prisma.user.findUnique({
      where: { id },
      include: {
        coordinator: true,
        supervisor: true,
      },
    });
  },
  createCoordenador: async (
    data: Omit<Prisma.UserCreateInput, "role">
  ): Promise<User> => {
    const coordenadorData = { ...data, role: UserRole.coordenador };
    return prisma.user.create({
      data: coordenadorData,
    });
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
    data: Omit<Prisma.UserCreateInput, "role">
  ): Promise<User> => {
    const supervisorData = { ...data, role: UserRole.supervisor };
    return prisma.user.create({
      data: supervisorData,
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
