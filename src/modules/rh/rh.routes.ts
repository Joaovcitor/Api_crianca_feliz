import { Router } from "express";
import RhController from "./rh.controller";
import { isAuthenticated } from "../../core/middlewares/auth.middleware";
import { verifyRole } from "../../core/middlewares/verifyRole.middleware";
const rhRouter = Router();

rhRouter.post(
  "/",
  isAuthenticated,
  verifyRole("coordenador"),
  RhController.createUser
);

export default rhRouter;
