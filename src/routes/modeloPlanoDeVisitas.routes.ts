import ModeloPlanoDeVisitasController from "../controllers/modeloDeVisitas.controller";
import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware";
const modelosRouter = Router();
modelosRouter.use(isAuthenticated);
modelosRouter.get("/", ModeloPlanoDeVisitasController.getAll);
modelosRouter.post("/", ModeloPlanoDeVisitasController.create);
modelosRouter.get("/:id", ModeloPlanoDeVisitasController.getById);
modelosRouter.put("/:id", ModeloPlanoDeVisitasController.update);

export default modelosRouter;
