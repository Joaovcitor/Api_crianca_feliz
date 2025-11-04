import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { mailService } from "../../core/libs/mailer";
import { emailTemplates } from "../../core/templates/emailTemplates";
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
  ToManyRequestsError,
  UnauthorizedError,
} from "../../core/errors/appErrors";

const prisma = new PrismaClient();

export const authService = {
  login: async (email: string, password: string) => {
    const user = await authService._findAndValidateUser(email);
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      await authService._handleFailedLoginAttempt(user);
      throw new UnauthorizedError("Credenciais inválidas");
    }
    return await authService._handleSuccessfulLogin(user);
  },
  sendResetPasswordEmail: async (email: string): Promise<void> => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new NotFoundError("Usuário não encontrado!");
    }
    const token = jwt.sign({ id: user.id }, process.env.SECRET_JWT as string, {
      expiresIn: "1h",
    });
    await mailService.sendMail({
      to: user.email,
      subject: "Redefinição de senha",
      html: emailTemplates.resetPassword(token),
    });
  },
  resetPassword: async (password: string, id: number): Promise<void> => {
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.update({
      where: { id: id },
      data: { password: hashedPassword },
    });
  },
  updatePassword: async (
    password: string,
    id: number
  ): Promise<User | void> => {
    const userExist = await prisma.user.findUnique({
      where: { id: id },
    });
    if (!userExist) {
      throw new NotFoundError("Usuário não encontrado!");
    }
    const passwordValid = await bcrypt.compare(password, userExist.password);
    if (passwordValid) {
      throw new BadRequestError("Senhas não podem ser iguais");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const passwordUpdate = await prisma.user.update({
      where: { id: id },
      data: { password: hashedPassword },
    });
    return passwordUpdate;
  },
  updateEmail: async (email: string, id: number): Promise<User | void> => {
    const existingUserWithEmail = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!email) {
      throw new BadRequestError("Email é obrigatório!");
    }

    if (existingUserWithEmail && existingUserWithEmail.id !== id) {
      throw new ConflictError("Existe usuário com esse email!");
    }

    const emailUpdate = await prisma.user.update({
      where: { id: id },
      data: { email: email },
    });
    return emailUpdate;
  },
  // métodos auxiliares
  _findAndValidateUser: async (email: string) => {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      throw new NotFoundError("Usuário não encontrado!");
    }
    if (!user.isActive) {
      throw new UnauthorizedError("Sua conta está bloqueada!");
    }
    return user;
  },
  _handleFailedLoginAttempt: async (user: User) => {
    const newWrongAttempts = user.wrongAttempts ? user.wrongAttempts + 1 : 1;

    if (newWrongAttempts >= 3) {
      await prisma.user.update({
        where: { id: user.id },
        data: { isActive: false, wrongAttempts: newWrongAttempts },
      });
      throw new ToManyRequestsError(
        "Muitas tentativas erradas. Sua conta foi bloqueada. Contate o administrador."
      );
    } else {
      await prisma.user.update({
        where: { id: user.id },
        data: { wrongAttempts: newWrongAttempts },
      });
    }
  },
  _handleSuccessfulLogin: async (user: User) => {
    if (user.wrongAttempts && user.wrongAttempts > 0) {
      await prisma.user.update({
        where: { id: user.id },
        data: { wrongAttempts: 0 },
      });
    }
    const secret = process.env.SECRET_JWT;
    if (!secret) {
      throw new BadRequestError("Secret JWT não definido");
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
};
