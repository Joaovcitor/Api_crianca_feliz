// src/server.ts

// 1. IMPORTAÇÕES DE MÓDULOS
// Usamos 'import' para todos os módulos. Isso é mais moderno e seguro em termos de tipos.
import dotenv from "dotenv";
import express, { Application, Request, Response, NextFunction } from "express";
import session from "express-session";
import sessionFileStore from "session-file-store";
import cookieParser from "cookie-parser";
import cors, { CorsOptions } from "cors";
import helmet from "helmet";
import path from "path";
import os from "os";

import caregiverRouter from "./routes/caregiver.routes";
import childRouter from "./routes/child.routes";
import homeRouter from "./routes/home.routes";
import authRoute from "./routes/auth.routes";
import visitasGeoRoutes from "./routes/visitasPorGeoLocalizacao.routes";
import supervisorRoutes from "./routes/supervisor.routes";

import faltasRoutes from "./routes/faltas.routes";
import userRoutes from "./routes/user.routes";
import planosDeVisitaRouter from "./routes/planos.routes";
import modelosRouter from "./routes/modeloPlanoDeVisitas.routes";

// 2. CONFIGURAÇÃO DO DOTENV
// Executado uma vez no início da aplicação.
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
    this.whiteList = [
      "https://primeirainfanciasuas.socialquixada.com.br",
      "https://www.primeirainfanciasuas.socialquixada.com.br",
      "https://172.31.48.1:4173",
      "https://localhost:5173",
      "http://localhost:3000",
      "http://localhost:8100",
      `http://localhost:4173`,
      "http://localhost:5173",
      "https://app-mobile-pcfv2-eight.vercel.app",
      "https://mobilepcf.socialquixada.com.br",
    ];

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
      // Em desenvolvimento, permite cookies em HTTP e mesma origem
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
  }

  private configureRoutes(): void {
    const apiBase = express.Router();

    apiBase.use("/", homeRouter);
    apiBase.use("/cuidador", caregiverRouter);
    apiBase.use("/crianca", childRouter);
    apiBase.use("/login", authRoute);
    apiBase.use("/planos", planosDeVisitaRouter);
    apiBase.use("/visitasporgeolo", visitasGeoRoutes);
    apiBase.use("/supervisor", supervisorRoutes);
    apiBase.use("/modelos", modelosRouter);
    apiBase.use("/users", userRoutes);
    apiBase.use("/faltas", faltasRoutes);

    this.app.use("/apiv1", apiBase);
  }

  public startServer(): void {
    const port = process.env.PORT || 3003;
    this.app.listen(port, () => {
      console.log(`🚀 Servidor TypeScript rodando na porta ${port}`);
    });
  }
}

new Server();
