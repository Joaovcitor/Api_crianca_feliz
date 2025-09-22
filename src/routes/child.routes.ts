import { Router } from "express";
import { ChildController } from "../controllers/child.controller";
import { isAuthenticated } from "../middlewares/auth.middleware";

const childRouter = Router();
childRouter.get("/", isAuthenticated, ChildController.getAll);
childRouter.get("/:id", isAuthenticated, ChildController.getById);
childRouter.post("/:id", isAuthenticated, ChildController.create);
childRouter.get(
  "/coordenador",
  isAuthenticated,
  ChildController.listarCriancasParaCoordenador
);
export default childRouter;
