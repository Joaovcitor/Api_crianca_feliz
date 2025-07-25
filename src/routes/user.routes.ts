import { Router } from "express";
import { UserController } from "../controllers/user.controller";

const userRoutes = Router();
userRoutes.get("/", UserController.getAll);
userRoutes.get("/:id", UserController.getById);
userRoutes.post("/criar-visitador", UserController.createVisitador);
userRoutes.post("/criar-supervisor", UserController.createSupervisor);
userRoutes.post("/criar-coordenador", UserController.createCoordenador);
userRoutes.put("/:id", UserController.update);
userRoutes.delete("/:id", UserController.delete);
export default userRoutes;
