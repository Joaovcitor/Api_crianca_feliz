import { Router } from "express";
import { authController } from "./auth.controller";
import { verifyTokenUrl } from "../../core/middlewares/verifyTokenUrl.middleware";
import { isAuthenticated } from "../../core/middlewares/auth.middleware";
import { rateLimitConfig } from "../../core/config/rateLimit";
const authRoutes = Router();
authRoutes.post(
  "/",
  rateLimitConfig(
    60 * 1000,
    5,
    "Muitas tentativas de login. Tente novamente mais tarde."
  ),
  authController.login
);
authRoutes.put("/update-email", isAuthenticated, authController.updateEmail);
authRoutes.post(
  "/reset-password",
  rateLimitConfig(
    60 * 1000,
    5,
    "Muitas tentativas de redefinição de senha. Tente novamente mais tarde."
  ),
  authController.sendResetPasswordEmail
);
authRoutes.patch(
  "/update-password",
  isAuthenticated,
  authController.updatePassword
);
authRoutes.patch(
  "/reset-password/:jwt",
  rateLimitConfig(
    60 * 1000,
    5,
    "Muitas tentativas de redefinição de senha. Por favor, solicite um novo link!"
  ),
  verifyTokenUrl,
  authController.resetPassword
);
export default authRoutes;
