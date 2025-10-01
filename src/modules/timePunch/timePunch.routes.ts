import { Router } from "express";
import TimePunchController from "./timePunch.controller";
import { isAuthenticated } from "../../core/middlewares/auth.middleware";
const timesPunchRouter = Router();

timesPunchRouter.post("/", isAuthenticated, TimePunchController.create);
timesPunchRouter.get(
  "/:userId",
  isAuthenticated,
  TimePunchController.getAllForUserLoggedOrByIdUrl
);
export default timesPunchRouter;
