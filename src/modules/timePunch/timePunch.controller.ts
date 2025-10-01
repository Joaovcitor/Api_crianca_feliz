import { timePunchService } from "./timePunch.service";
import { Request, Response } from "express";

class TimePunchController {
  async create(req: Request, res: Response) {
    const userId = req.user?.id;
    const { type, latitude, longitude, notes } = req.body;
    try {
      const timePunch = await timePunchService.create(
        Number(userId),
        type,
        latitude,
        longitude,
        notes
      );
      res.status(201).json(timePunch);
    } catch (e: any) {
      console.log(e);
    }
  }
  async getAllForUserLoggedOrByIdUrl(req: Request, res: Response) {
    const { userId } = req.params;
    const timesPunch = await timePunchService.getAllForUserLoggedOrByIdUrl(
      Number(userId)
    );
    res.status(200).json(timesPunch);
  }
}

export default new TimePunchController();
