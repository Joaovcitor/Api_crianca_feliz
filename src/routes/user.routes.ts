import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { isAuthenticated } from "../middlewares/auth.middleware";

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
userRoutes.delete("/:id", isAuthenticated, UserController.delete);
export default userRoutes;
