import { Router } from "express";
import { CaregiverController } from "../controllers/caregiver.controller";
import { isAuthenticated } from "../middlewares/auth.middleware";
const caregiverRoute = Router();

caregiverRoute.get("/", CaregiverController.getAll);
caregiverRoute.post("/", isAuthenticated, CaregiverController.create);

export default caregiverRoute;
