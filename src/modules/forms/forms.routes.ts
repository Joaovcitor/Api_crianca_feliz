import { Router } from "express";
import FormsController from "./forms.controller";
import { isAuthenticated } from "../../core/middlewares/auth.middleware";

const formsRoutes = Router();

formsRoutes.post("/", isAuthenticated, FormsController.create);
formsRoutes.get("/", isAuthenticated, FormsController.getAll);
export default formsRoutes;
