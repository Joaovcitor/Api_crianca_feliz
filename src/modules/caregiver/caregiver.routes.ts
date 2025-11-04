import { Router } from "express";
import { CaregiverController } from "./caregiver.controller";
import { isAuthenticated } from "../../core/middlewares/auth.middleware";
const caregiverRoute = Router();

caregiverRoute.get("/", CaregiverController.getAll);
caregiverRoute.get(
  "/meus-cuidadores",
  isAuthenticated,
  CaregiverController.caregiversDoVisitador
);
caregiverRoute.get("/:id", isAuthenticated, CaregiverController.getById);
caregiverRoute.post("/", isAuthenticated, CaregiverController.create);
caregiverRoute.patch(
  "/validar/:id",
  isAuthenticated,
  CaregiverController.validarCaregiver
);
caregiverRoute.patch("/:id", isAuthenticated, CaregiverController.update);
caregiverRoute.patch(
  "/:id/pregnant",
  isAuthenticated,
  CaregiverController.updatePregnant
);
caregiverRoute.delete("/:id", isAuthenticated, CaregiverController.delete);

export default caregiverRoute;
