import { Router } from "express";
import PostController from "./post.controller";
import { isAuthenticated } from "../../core/middlewares/auth.middleware";

const postRouter = Router();
postRouter.get("/", isAuthenticated, PostController.getAll);
postRouter.get("/:id", isAuthenticated, PostController.getById);
postRouter.post("/", isAuthenticated, PostController.create);

export default postRouter;
