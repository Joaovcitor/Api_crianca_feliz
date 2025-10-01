import { Router } from "express";
import { SupervisorController } from "./supervisor.controller";
import { isAuthenticated } from "../../core/middlewares/auth.middleware";

const supervisorRoutes = Router();

supervisorRoutes.get(
  "/visitadores",
  isAuthenticated,
  SupervisorController.getVisitadoresDoSupervisor
);

export default supervisorRoutes;
