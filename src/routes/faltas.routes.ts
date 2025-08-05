import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { FaltasController } from "../controllers/faltas.controller";

const faltasRoutes = Router();

faltasRoutes.get("/", isAuthenticated, FaltasController.getAll);
faltasRoutes.get("/:id", isAuthenticated, FaltasController.getById);
faltasRoutes.get(
  "/faltas-do-usuario",
  isAuthenticated,
  FaltasController.faltasDoUsuarioLogado
);
faltasRoutes.post("/gerar-falta", isAuthenticated, FaltasController.create);

export default faltasRoutes;
