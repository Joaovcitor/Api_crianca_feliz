import { Router } from "express";
import { HomeController } from "./home.controller";
import { isAuthenticated } from "../../core/middlewares/auth.middleware";

const homeRouter = Router();
homeRouter.get("/", isAuthenticated, HomeController.home);
export default homeRouter;
