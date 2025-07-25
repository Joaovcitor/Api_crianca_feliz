import { Request, Response } from "express";

export const HomeController = {
  async home(req: Request, res: Response) {
    try {
      const loggedUser = req.user;
      console.log("Usuário autenticado:", loggedUser);
      if (!loggedUser) {
        return res.status(401).json({ error: "Usuário não autenticado" });
      }
      const { password, ...userResponse } = loggedUser;
      return res.status(200).json({ user: userResponse });
    } catch (error) {
      console.error("Erro ao acessar a rota home:", error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  },
};
