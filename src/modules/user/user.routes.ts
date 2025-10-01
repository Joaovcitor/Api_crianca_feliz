import { Router } from "express";
import { UserController } from "./user.controller";
import { isAuthenticated } from "../../core/middlewares/auth.middleware";
import { verifyRole } from "../../core/middlewares/verifyRole.middleware";

const userRoutes = Router();
userRoutes.get("/", isAuthenticated, UserController.getAll);
userRoutes.get("/:id", isAuthenticated, UserController.getById);
userRoutes.post(
  "/criar-visitador",
  isAuthenticated,
  UserController.createVisitador
);
userRoutes.post(
  "/criar-supervisor",
  isAuthenticated,
  UserController.createSupervisor
);
userRoutes.post("/criar-coordenador", UserController.createCoordenador);
userRoutes.put("/:id", isAuthenticated, UserController.update);
userRoutes.delete(
  "/:id",
  isAuthenticated,
  verifyRole("coordenador"),
  UserController.delete
);
userRoutes.patch(
  "/:id/desativar",
  isAuthenticated,
  verifyRole("coordenador"),
  UserController.desativarConta
);
userRoutes.patch("/:id/ativar", isAuthenticated, UserController.ativarConta);

export default userRoutes;
