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

// Importe suas rotas aqui (eventualmente, elas também serão .ts)
// Por enquanto, o TypeScript consegue importar arquivos .js se "allowJs": true estiver no tsconfig.json
import caregiverRouter from "./routes/caregiverRoutes";
import childRouter from "./routes/childrenRoutes";
import homeRouter from "./routes/home.routes";
import formRouter from "./routes/formsRoutes";
import familiaRouter from "./routes/familiaRoutes";
import authRoute from "./routes/auth.routes";
import supervisorRouter from "./routes/supervisorRoutes";
import visitadoresDosSupervisores from "./routes/visitadoresRoutes";
import detalhesVisitadorRoute from "./routes/detalhesVisitadorRoutes";
import PlanoDeVisitaRouter from "./routes/planosDeVisita";
import coordenadorRoutes from "./routes/coordenadorRoutes";
import visitasGeoRoutes from "./routes/visitasGeoRoutes";
import tabelaDeVisitasRoutes from "./routes/tabelaDeVisitasRoutes";
import pdfRouters from "./routes/pdfRoutes";
import etapa2Routers from "./routes/form5Etapa2Routes";
import etapa3Routers from "./routes/form5Etapa3Routes";
import etapa4Routers from "./routes/form5Etapa4Routes";
import etapa5Routers from "./routes/form5Etapa5Routes";
import etapa6Routers from "./routes/form5Etapa6Routes";
import etapa7Routers from "./routes/form5Etapa7Routes";
import f7etapa2Routers from "./routes/form7Etapa2Routes";
import f7etapa3Routers from "./routes/form7Etapa3Routes";
import f7etapa4Routers from "./routes/form7Etapa4Routes";
import f7etapa5Routers from "./routes/form7Etapa5Routes";
import f7etapa6Routers from "./routes/form7Etapa6Routes";
import f7etapa7Routers from "./routes/form7Etapa7Routes";
import notificacoesRouter from "./routes/notificacoesRoutes";
import emailRouter from "./routes/emailRoute";
// import usersRoutes from "./routes/userRoutes";
import faltasRoutes from "./routes/faltasRoutes";
import userRoutes from "./routes/user.routes";

// 2. CONFIGURAÇÃO DO DOTENV
// Executado uma vez no início da aplicação.
dotenv.config({
  path:
    process.env.NODE_ENV === "production"
      ? ".env.production"
      : ".env.development",
});

// 3. A CLASSE DO SERVIDOR
class Server {
  // Declaração das propriedades da classe com seus tipos
  public app: Application;
  private readonly whiteList: string[];

  constructor() {
    this.app = express();
    this.whiteList = [
      "https://criancafeliz.logicmasters.com.br",
      "http://localhost:3001",
      "http://192.168.1.71:38157",
      "http://localhost:3000",
      "http://localhost:46635",
      `http://192.168.1.71:3000`,
      "http://192.168.1.43:3000",
      "http://192.168.1.28:3000",
      "http://192.168.0.4:3000",
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

    this.app.use(cors(corsOptions));
    this.app.use(helmet());
    this.app.set("trust proxy", 1);

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
        cookie: {
          secure: false,
          maxAge: 28800000,
          httpOnly: true,
          sameSite: "lax",
        },
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
    apiBase.use("/formularios", formRouter);
    apiBase.use("/familias", familiaRouter);
    apiBase.use("/login", authRoute);
    apiBase.use("/supervisor", supervisorRouter);
    apiBase.use("/visitadores", visitadoresDosSupervisores);
    apiBase.use("/detalhes", detalhesVisitadorRoute);
    apiBase.use("/planos", PlanoDeVisitaRouter);
    apiBase.use("/coordenador", coordenadorRoutes);
    apiBase.use("/visitasporgeolo", visitasGeoRoutes);
    apiBase.use("/tabelas", tabelaDeVisitasRoutes);
    apiBase.use("/pdf", pdfRouters);
    apiBase.use("/form5-etapa2", etapa2Routers);
    apiBase.use("/form5-etapa3", etapa3Routers);
    apiBase.use("/form5-etapa4", etapa4Routers);
    apiBase.use("/form5-etapa5", etapa5Routers);
    apiBase.use("/form5-etapa6", etapa6Routers);
    apiBase.use("/form5-etapa7", etapa7Routers);
    apiBase.use("/form7-etapa2", f7etapa2Routers);
    apiBase.use("/form7-etapa3", f7etapa3Routers);
    apiBase.use("/form7-etapa4", f7etapa4Routers);
    apiBase.use("/form7-etapa5", f7etapa5Routers);
    apiBase.use("/form7-etapa6", f7etapa6Routers);
    apiBase.use("/form7-etapa7", f7etapa7Routers);
    apiBase.use("/notificacoes", notificacoesRouter);
    apiBase.use("/email", emailRouter);
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
