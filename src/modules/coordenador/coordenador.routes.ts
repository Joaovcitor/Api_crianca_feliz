import { Router } from "express";
import { isAuthenticated } from "../../core/middlewares/auth.middleware";
import { CoordenadorController } from "./coordenador.controller";

const coordenadorRouter = Router();
coordenadorRouter.get(
  "/supervisores",
  isAuthenticated,
  CoordenadorController.getSupervisores
);
coordenadorRouter.get(
  "/supervisores/:supervisorId",
  isAuthenticated,
  CoordenadorController.getSupervisorById
);

export default coordenadorRouter;
