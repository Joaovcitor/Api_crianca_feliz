import { Router } from "express";
import { VisitadoresController } from "../controllers/visitadores.controller";
import { isAuthenticated } from "../middlewares/auth.middleware";
const visitadoresRoute = Router();
visitadoresRoute.get("/", isAuthenticated, VisitadoresController.getAll);
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

export default visitadoresRoute;
