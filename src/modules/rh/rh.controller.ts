import { RhService } from "./rh.service";
import { Request, Response } from "express";

class RhController {
  async createUser(req: Request, res: Response) {
    const data = req.body;
    const user = await RhService.createUser(data);
    return res.status(201).json(user);
  }
}
export default new RhController();
