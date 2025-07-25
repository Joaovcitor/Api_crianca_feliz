import { Router } from "express";
import { authController } from "../controllers/auth.controller";
const authRoutes = Router();
authRoutes.post("/", authController.login);
export default authRoutes;
