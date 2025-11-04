import { Router } from "express";
import FormsController from "./forms.controller";
import { isAuthenticated } from "../../core/middlewares/auth.middleware";

const formsRoutes = Router();

formsRoutes.post("/", isAuthenticated, FormsController.create);
formsRoutes.get(
  "/registros/:id",
  isAuthenticated,
  FormsController.getFormsChild
);
formsRoutes.get("/", isAuthenticated, FormsController.getAll);
formsRoutes.post(
  "/registrar/:id",
  isAuthenticated,
  FormsController.registrarForm
);
export default formsRoutes;
