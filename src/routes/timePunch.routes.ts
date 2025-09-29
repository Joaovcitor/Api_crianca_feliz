import { Router } from "express";
import timePunchController from "../controllers/timePunch.controller";
import { isAuthenticated } from "../middlewares/auth.middleware";
const timesPunchRouter = Router();

timesPunchRouter.post("/", isAuthenticated, timePunchController.create);
timesPunchRouter.get(
  "/:userId",
  isAuthenticated,
  timePunchController.getAllForUserLoggedOrByIdUrl
);
export default timesPunchRouter;
