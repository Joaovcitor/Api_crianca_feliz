import { Router } from "express";
import { HomeController } from "../controllers/home.controller";
import { isAuthenticated } from "../middlewares/auth.middleware";

const homeRouter = Router();
homeRouter.get("/", isAuthenticated, HomeController.home);
export default homeRouter;
