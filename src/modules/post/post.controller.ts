import { PostService } from "./post.service";
import { Request, Response } from "express";
import { PostCreateDto } from "./post.dto";
import { UnauthorizedError } from "../../core/errors/appErrors";
import { sendSuccess } from "../../core/utils/responseHandler";

class PostController {
  async create(req: Request, res: Response) {
    const { title, content } = req.body as PostCreateDto;
    const authorId = req.user?.id;
    if (!authorId) {
      throw new UnauthorizedError("Usuário não autorizado!");
    }
    const post = await PostService.create({ title, content }, authorId);
    return sendSuccess(res, post);
  }
  async getAll(req: Request, res: Response) {
    const posts = await PostService.getAll();
    return sendSuccess(res, posts);
  }
  async getById(req: Request, res: Response) {
    const { id } = req.params;
    const post = await PostService.getById(Number(id));
    return sendSuccess(res, post);
  }
}

export default new PostController();
