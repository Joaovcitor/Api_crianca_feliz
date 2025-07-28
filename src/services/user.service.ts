import { PrismaClient, UserRole, User, Prisma } from "@prisma/client";
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
