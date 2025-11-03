import { Router } from "express";
import { PlanosDeVisitaController } from "./planoDeVisita.controller";
import { isAuthenticated } from "../../core/middlewares/auth.middleware";
const planosDeVisitaRouter = Router();

planosDeVisitaRouter.get(
  "/planos-da-crianca/:id",
  isAuthenticated,
  PlanosDeVisitaController.getAll
);
planosDeVisitaRouter.get(
  "/:id",
  isAuthenticated,
  PlanosDeVisitaController.getById
);
planosDeVisitaRouter.post(
  "/",
  isAuthenticated,
  PlanosDeVisitaController.createPlanoForChild
);
planosDeVisitaRouter.patch(
  "/:id",
  isAuthenticated,
  PlanosDeVisitaController.update
);

export default planosDeVisitaRouter;
