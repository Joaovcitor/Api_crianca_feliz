import { Request, Response } from "express";
import { authService } from "../services/auth.service";
export const authController = {
  login: async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;

    try {
      const result = await authService.login(email, password);
      res.cookie("jwt", result.token, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
        maxAge: 8 * 60 * 60 * 1000, // 8 horas
      });

      console.log(result);
      return res.status(200).json({ result });
    } catch (error: unknown) {
      return res.status(401).json({ error: "Ocorreu um erro desconhecido" });
    }
  },
};
