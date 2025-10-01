import { Router } from "express";
import { authController } from "./auth.controller";
import { verifyTokenUrl } from "../../core/middlewares/verifyTokenUrl.middleware";
const authRoutes = Router();
authRoutes.post("/", authController.login);
authRoutes.put("/update-email", authController.updateEmail);
authRoutes.post("/reset-password", authController.sendResetPasswordEmail);
authRoutes.patch(
  "/reset-password/:jwt",
  verifyTokenUrl,
  authController.resetPassword
);
export default authRoutes;
