import { Router } from "express";
import { ChildController } from "../controllers/child.controller";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { verifyRole } from "../middlewares/verifyRole.middleware";

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
