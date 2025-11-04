import "express-async-errors";
import dotenv from "dotenv";
import express, { Application } from "express";
import corsOptions from "./core/config/corsConfig";
import cors, { CorsOptions } from "cors";
import helmet from "helmet";
import { errorHandler } from "./core/middlewares/errorHandler";
import routesGlobal from "./core/config/routesGlobal";
import listDomains from "./core/config/whiteList";
import { sessionConfig } from "./core/config/sessionConfig";
import cookieParser from "cookie-parser";

dotenv.config({
  path:
    process.env.NODE_ENV === "production"
      ? ".env.production"
      : ".env.development",
});

class Server {
  public app: Application;
  private readonly whiteList: string[];

  constructor() {
    this.app = express();
    this.whiteList = listDomains;
    this.configureMiddlewares();
    this.configureRoutes();
    this.app.use(errorHandler);
    this.startServer();
  }

  private configureMiddlewares(): void {
    if (process.env.NODE_ENV === "production") {
      this.app.set("trust proxy", 1);
    }

    this.app.use(cors(corsOptions));
    this.app.use(helmet());

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    this.app.use(express.static("public"));
    this.app.use(cookieParser());
    this.app.use(sessionConfig);
  }

  private configureRoutes(): void {
    this.app.use("/apiv1", routesGlobal);
  }

  public startServer(): void {
    const port = process.env.PORT || 3003;
    this.app.listen(port, () => {
      console.log(`🚀 Servidor TypeScript rodando na porta ${port}`);
    });
  }
}

new Server();
