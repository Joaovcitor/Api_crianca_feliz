import { Request, Response } from "express";
import { authService } from "../services/auth.service";
import { emailUpdate } from "../zod/schemas.zod";
import z from "zod";
export const authController = {
  login: async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;

    try {
      const result = await authService.login(email, password);
      res.cookie("jwt", result.token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 8 * 60 * 60 * 1000,
      });

      return res.status(200).json({ result });
    } catch (error: unknown) {
      if (error instanceof Error && error.message === "Invalid credentials") {
        return res.status(401).json({ error: "Credenciais inválidas" });
      }
      if (
        error instanceof Error &&
        error.message ===
          "Muitas tentativas erradas. Sua conta foi bloqueada. Contate o administrador."
      ) {
        return res
          .status(403)
          .json({ error: "Conta bloqueada. Contate o administrador." });
      }
      return res.status(401).json({ error: "Ocorreu um erro desconhecido" });
    }
  },
  updateEmail: async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id, email } = emailUpdate.parse(req.body);
      const result = await authService.updateEmail(email, id);
      return res.status(200).json({ result });
    } catch (error: unknown) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: "Dados inválidos",
        });
      }
      return res.status(400).json({ error: "Ocorreu um erro desconhecido" });
    }
  },
  sendResetPasswordEmail: async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { email } = req.body;
      await authService.sendResetPasswordEmail(email);
      return res.status(200).json({ message: "Email enviado com sucesso!" });
    } catch (error: unknown) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: "Dados inválidos",
        });
      }
      return res.status(400).json({ error: "Ocorreu um erro desconhecido" });
    }
  },
  resetPassword: async (req: Request, res: Response): Promise<Response> => {
    try {
      const { password } = req.body;
      const id = req.user?.id;
      if (!id) {
        return res.status(400).json({ error: "Dados inválidos" });
      }
      await authService.resetPassword(password, id);
      return res.status(200).json({ message: "Senha redefinida com sucesso!" });
    } catch (error: unknown) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: "Dados inválidos",
        });
      }
      return res.status(400).json({ error: "Ocorreu um erro desconhecido" });
    }
  },
};
