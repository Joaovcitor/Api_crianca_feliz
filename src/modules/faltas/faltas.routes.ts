import { Router } from "express";
import { isAuthenticated } from "../../core/middlewares/auth.middleware";
import { FaltasController } from "./faltas.controller";

const faltasRoutes = Router();

faltasRoutes.get("/", isAuthenticated, FaltasController.getAll);
faltasRoutes.get("/:id", isAuthenticated, FaltasController.getById);
faltasRoutes.get(
  "/faltas-do-usuario",
  isAuthenticated,
  FaltasController.faltasDoUsuarioLogado
);
faltasRoutes.post("/gerar-falta", isAuthenticated, FaltasController.create);
faltasRoutes.post(
  "/invalidar-ou-validar",
  isAuthenticated,
  FaltasController.invalidarFalta
);
export default faltasRoutes;
