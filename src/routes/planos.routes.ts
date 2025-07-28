import { Router } from "express";
import { PlanosDeVisitaController } from "../controllers/planoDeVisita.controller";
const planosDeVisitaRouter = Router();

planosDeVisitaRouter.get("/", PlanosDeVisitaController.getAll);
planosDeVisitaRouter.get("/:id", PlanosDeVisitaController.getById);
planosDeVisitaRouter.post("/:id", PlanosDeVisitaController.createPlanoForChild);
planosDeVisitaRouter.patch("/:id", PlanosDeVisitaController.update);

export default planosDeVisitaRouter;
