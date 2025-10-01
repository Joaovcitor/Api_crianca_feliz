import "express-async-errors";
import dotenv from "dotenv";
import express, { Application, Request, Response, NextFunction } from "express";
import session from "express-session";
import sessionFileStore from "session-file-store";
import cookieParser from "cookie-parser";
import cors, { CorsOptions } from "cors";
import helmet from "helmet";
import path from "path";
import os from "os";
import { errorHandler } from "./core/middlewares/errorHandler";
import routesGlobal from "./core/config/routesGlobal";
import listDomains from "./core/config/whiteList";

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
    this.startServer();
  }

  private configureMiddlewares(): void {
    const FileStore = sessionFileStore(session);

    const corsOptions: CorsOptions = {
      origin: (origin, callback) => {
        if (!origin || this.whiteList.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
      credentials: true,
    };

    const cookieSettings: session.CookieOptions = {
      maxAge: 28800000, // 8 horas
      httpOnly: true,
    };

    // Se estiver em produção, aplica as regras de segurança máxima
    if (process.env.NODE_ENV === "production") {
      this.app.set("trust proxy", 1); // Confia no proxy (ex: Nginx, Heroku, etc.)
      cookieSettings.secure = true;
      cookieSettings.sameSite = "none";
    } else {
      cookieSettings.secure = false;
      cookieSettings.sameSite = "lax";
    }

    this.app.use(cors(corsOptions));
    this.app.use(helmet());

    this.app.use(express.urlencoded({ extended: true }));

    this.app.use(
      session({
        name: "session",
        secret: "akdkwodofefgneogeonmefnepddm",
        resave: false,
        saveUninitialized: false,
        store: new FileStore({
          logFn: function () {},
          path: path.join(os.tmpdir(), "sessions"),
        }),
        cookie: cookieSettings,
      })
    );

    this.app.use(express.static("public"));
    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.use(errorHandler);
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
