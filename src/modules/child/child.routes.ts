import { Router } from "express";
import { ChildController } from "./child.controller";
import { isAuthenticated } from "../../core/middlewares/auth.middleware";
import { verifyRole } from "../../core/middlewares/verifyRole.middleware";

const childRouter = Router();
childRouter.get("/", isAuthenticated, ChildController.getAll);
childRouter.get(
  "/coordenador",
  isAuthenticated,
  verifyRole("coordenador"),
  ChildController.listarCriancasParaCoordenador
);
childRouter.get("/:id", isAuthenticated, ChildController.getById);
childRouter.post("/:id", isAuthenticated, ChildController.create);
childRouter.put(
  "/:id",
  isAuthenticated,
  verifyRole("coordenador"),
  ChildController.update
);
childRouter.delete(
  "/:id",
  isAuthenticated,
  verifyRole("coordenador"),
  ChildController.delete
);

export default childRouter;
