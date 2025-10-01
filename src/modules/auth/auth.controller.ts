import { Request, Response } from "express";
import { authService } from "./auth.service";
import { emailUpdate } from "../../core/libs/zod/schemas.zod";
import { UnauthorizedError } from "../../core/errors/appErrors";
import {
  sendSuccess,
  sendSuccessMessage,
} from "../../core/utils/responseHandler";
export const authController = {
  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    res.cookie("jwt", result.token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 8 * 60 * 60 * 1000,
    });
    return sendSuccess(res, result);
  },
  updateEmail: async (req: Request, res: Response) => {
    const { id, email } = emailUpdate.parse(req.body);
    const result = await authService.updateEmail(email, id);
    return sendSuccess(res, result);
  },
  sendResetPasswordEmail: async (req: Request, res: Response) => {
    const { email } = req.body;
    await authService.sendResetPasswordEmail(email);
    return sendSuccessMessage(res, "Email enviado com sucesso!");
  },
  resetPassword: async (req: Request, res: Response) => {
    const { password } = req.body;
    const id = req.user?.id;
    if (!id) {
      throw new UnauthorizedError("Você precisa estar autenticado!");
    }
    await authService.resetPassword(password, id);
    return sendSuccessMessage(res, "Senha redefinida com sucesso!");
  },
};
