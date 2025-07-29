import { Router } from "express";
import { PlanosDeVisitaController } from "../controllers/planoDeVisita.controller";
import { isAuthenticated } from "../middlewares/auth.middleware";
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
  "/:id",
  isAuthenticated,
  PlanosDeVisitaController.createPlanoForChild
);
planosDeVisitaRouter.patch(
  "/:id",
  isAuthenticated,
  PlanosDeVisitaController.update
);

export default planosDeVisitaRouter;
