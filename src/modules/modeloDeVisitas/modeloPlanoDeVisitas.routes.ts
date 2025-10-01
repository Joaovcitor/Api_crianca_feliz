import ModeloPlanoDeVisitasController from "./modeloDeVisitas.controller";
import { Router } from "express";
import { isAuthenticated } from "../../core/middlewares/auth.middleware";
const modelosRouter = Router();
modelosRouter.use(isAuthenticated);
modelosRouter.get("/", ModeloPlanoDeVisitasController.getAll);
modelosRouter.post("/", ModeloPlanoDeVisitasController.create);
modelosRouter.get("/:id", ModeloPlanoDeVisitasController.getById);
modelosRouter.put("/:id", ModeloPlanoDeVisitasController.update);

export default modelosRouter;
