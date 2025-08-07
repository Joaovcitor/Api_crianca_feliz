import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const authService = {
  login: async (
    email: string,
    password: string
  ): Promise<{ token: string; user: Partial<User> }> => {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Senha inválida");
    }

    const secret = process.env.SECRET_JWT;
    if (!secret) {
      throw new Error("Secret JWT não definido");
    }

    const token = jwt.sign({ id: user.id }, secret, {
      expiresIn: "8h",
    });

    const { password: _, ...userWithoutPassword } = user;

    return {
      token,
      user: userWithoutPassword,
    };
  },
  updateEmail: async (email: string, id: number): Promise<User | void> => {
    const existingUserWithEmail = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!email) {
      throw new Error("Email é obrigatório!");
    }

    if (existingUserWithEmail && existingUserWithEmail.id !== id) {
      throw new Error("Existe usuário com esse email!");
    }

    const emailUpdate = await prisma.user.update({
      where: { id: id },
      data: { email: email },
    });
    return emailUpdate;
  },
};
