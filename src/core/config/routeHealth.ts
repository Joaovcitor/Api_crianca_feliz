import { Response, Request, Router } from "express";
import { prisma } from "../prisma/prisma";
import { sendErrorInternalServer, sendSuccess } from "../utils/responseHandler";
const healthRouter = Router();

healthRouter.get("/", async (req: Request, res: Response) => {
  const data = {
    uptime: process.uptime(),
    message: "OK",
    timestamp: new Date().toISOString(),
    dependencies: {
      database: "OK",
    },
  };
  try {
    await prisma.$queryRaw`SELECT 1`;
    return sendSuccess(res, data);
  } catch (e: any) {
    data.message = "Serviço indisponível";
    data.dependencies.database = "Serviço indisponível";
    return sendErrorInternalServer(res, data, 503);
  }
});

export default healthRouter;
