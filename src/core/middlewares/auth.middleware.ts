import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { UnauthorizedError, AppError } from "../errors/appErrors";

const prisma = new PrismaClient();
interface JwtPayload {
  id: number;
}

export async function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { jwt: token } = req.cookies;
  if (!token) {
    throw new UnauthorizedError("Token não fornecido");
  }

  const secret = process.env.SECRET_JWT;
  if (!secret) {
    console.error("ERRO GRAVE: SECRET_JWT não foi definida no ambiente.");
    throw new AppError("Erro de configuração interna do servidor.", 500);
  }
  let decoded: JwtPayload;
  try {
    decoded = jwt.verify(token, secret) as JwtPayload;
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      throw new UnauthorizedError(
        "Token expirado. Por favor, faça login novamente."
      );
    }
    if (error.name === "JsonWebTokenError") {
      throw new UnauthorizedError(
        "Token inválido (assinatura ou formato incorreto)."
      );
    }
    throw error;
  }
  const user = await prisma.user.findUnique({
    where: { id: decoded.id },
  });

  if (!user) {
    throw new UnauthorizedError("Usuário do token não encontrado");
  }
  req.user = user;
  next();
}
