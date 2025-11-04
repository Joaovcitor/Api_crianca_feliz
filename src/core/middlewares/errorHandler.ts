import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/appErrors";
export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
  }

  console.error("Erro inesperado: ", error);

  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
}
