import { Router } from "express";
import { SupervisorController } from "../controllers/supervisor.controller";
import { isAuthenticated } from "../middlewares/auth.middleware";

const supervisorRoutes = Router();

supervisorRoutes.get(
  "/visitadores",
  isAuthenticated,
  SupervisorController.getVisitadoresDoSupervisor
);

export default supervisorRoutes;
