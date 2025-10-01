import { Router } from "express";
import { VisitadoresController } from "./visitadores.controller";
import { isAuthenticated } from "../../core/middlewares/auth.middleware";
const visitadoresRoute = Router();
visitadoresRoute.get("/", isAuthenticated, VisitadoresController.getAll);
visitadoresRoute.get("/:id", isAuthenticated, VisitadoresController.getById);
visitadoresRoute.patch(
  "/desativar/:id",
  isAuthenticated,
  VisitadoresController.desativarConta
);
visitadoresRoute.patch(
  "/validar/:id",
  isAuthenticated,
  VisitadoresController.validarConta
);
visitadoresRoute.patch(
  "/mudar-supervisor/:id",
  isAuthenticated,
  VisitadoresController.atualizarVisitadorParaOutroSupervisor
);

export default visitadoresRoute;
