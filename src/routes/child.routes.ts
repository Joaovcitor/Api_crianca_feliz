import { Router } from "express";
import { ChildController } from "../controllers/child.controller";
import { isAuthenticated } from "../middlewares/auth.middleware";

const childRouter = Router();
childRouter.get("/", isAuthenticated, ChildController.getAll);
childRouter.get(
  "/coordenador",
  isAuthenticated,
  ChildController.listarCriancasParaCoordenador
);
childRouter.get("/:id", isAuthenticated, ChildController.getById);
childRouter.post("/:id", isAuthenticated, ChildController.create);
childRouter.put("/:id", isAuthenticated, ChildController.update);
childRouter.delete("/:id", isAuthenticated, ChildController.delete);

export default childRouter;
