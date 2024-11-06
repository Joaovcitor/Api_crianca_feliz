const express = require("express");
const conn = require("./db/conn");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const flash = require("express-flash");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const cors = require("cors");
const helmet = require("helmet");

class Server {
  constructor() {
    this.app = express();
    this.whiteList = [
      "https://criancafeliz.logicmasters.com.br",
      "http://localhost:3001",
      "http://localhost:3000",
      "https://pcfprefeitura.logicmasters.com.br",
      "https://pcfv2.netlify.app",
    ];

    this.configureMiddlewares();
    this.configureRoutes();
    this.startServer();
  }

  configureMiddlewares() {
    const corsOptions = {
      origin: (origin, callback) => {
        if (this.whiteList.indexOf(origin) !== -1 || !origin) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by cors"));
        }
      },
      credentials: true,
    };

    this.app.use(cors(corsOptions));
    this.app.use(helmet());
    this.app.set("trust proxy", 1);

    this.app.use(
      express.urlencoded({
        extended: true,
      })
    );

    this.app.use(
      session({
        name: "session",
        secret: "akdkwodofefgneogeonmefnepddm",
        resave: false,
        saveUninitialized: false,
        store: new FileStore({
          logFn: function () {},
          path: require("path").join(require("os").tmpdir(), "sessions"),
        }),
        cookie: {
          secure: true,
          maxAge: 28800000,
          httpOnly: true,
          sameSite: "none",
        },
      })
    );

    this.app.use(flash());
    this.app.use(express.static("public"));
    this.app.use(express.json());
    this.app.use(cookieParser());

    this.app.use((req, res, next) => {
      if (req.session.userId) {
        res.locals.session = req.session;
      }
      next();
    });
  }

  configureRoutes() {
    const caregiverRouter = require("./routes/caregiverRoutes");
    const childRouter = require("./routes/childrenRoutes");
    const homeRouter = require("./routes/homeRoute");
    const formRouter = require("./routes/formsRoutes");
    const familiaRouter = require("./routes/familiaRoutes");
    const authRoute = require("./routes/authRoutes");
    const supervisorRouter = require("./routes/supervisorRoutes");
    const visitadoresDosSupervisores = require("./routes/visitadoresRoutes");
    const detalhesVisitadorRoute = require("./routes/detalhesVisitadorRoutes");
    const PlanoDeVisitaRouter = require("./routes/planosDeVisita");
    const coordenadorRoutes = require("./routes/coordenadorRoutes");
    const visitasGeoRoutes = require("./routes/visitasGeoRoutes");
    const tabelaDeVisitasRoutes = require("./routes/tabelaDeVisitasRoutes");
    const pdfRouters = require("./routes/pdfRoutes");

    const etapa2Routers = require("./routes/form5Etapa2Routes");
    const etapa3Routers = require("./routes/form5Etapa3Routes");
    const etapa4Routers = require("./routes/form5Etapa4Routes");
    const etapa5Routers = require("./routes/form5Etapa5Routes");
    const etapa6Routers = require("./routes/form5Etapa6Routes");
    const etapa7Routers = require("./routes/form5Etapa7Routes");

    const f7etapa2Routers = require("./routes/form7Etapa2Routes");
    const f7etapa3Routers = require("./routes/form7Etapa3Routes");
    const f7etapa4Routers = require("./routes/form7Etapa4Routes");
    const f7etapa5Routers = require("./routes/form7Etapa5Routes");
    const f7etapa6Routers = require("./routes/form7Etapa6Routes");
    const f7etapa7Routers = require("./routes/form7Etapa7Routes");

    const notificacoesRouter = require("./routes/notificacoesRoutes");

    this.app.use("/", homeRouter);
    this.app.use("/cuidador", caregiverRouter);
    this.app.use("/crianca", childRouter);
    this.app.use("/formularios", formRouter);
    this.app.use("/familias", familiaRouter);
    this.app.use("/login", authRoute);
    this.app.use("/supervisor", supervisorRouter);
    this.app.use("/visitadores", visitadoresDosSupervisores);
    this.app.use("/detalhes", detalhesVisitadorRoute);
    this.app.use("/planos", PlanoDeVisitaRouter);
    this.app.use("/coordenador", coordenadorRoutes);
    this.app.use("/visitasporgeolo", visitasGeoRoutes);
    this.app.use("/tabelas", tabelaDeVisitasRoutes);
    this.app.use("/pdf", pdfRouters);
    this.app.use("/form5-etapa2", etapa2Routers);
    this.app.use("/form5-etapa3", etapa3Routers);
    this.app.use("/form5-etapa4", etapa4Routers);
    this.app.use("/form5-etapa5", etapa5Routers);
    this.app.use("/form5-etapa6", etapa6Routers);
    this.app.use("/form5-etapa7", etapa7Routers);
    this.app.use("/form7-etapa2", f7etapa2Routers);
    this.app.use("/form7-etapa3", f7etapa3Routers);
    this.app.use("/form7-etapa4", f7etapa4Routers);
    this.app.use("/form7-etapa5", f7etapa5Routers);
    this.app.use("/form7-etapa6", f7etapa6Routers);
    this.app.use("/form7-etapa7", f7etapa7Routers);
    this.app.use("/notificacoes", notificacoesRouter);
  }

  startServer() {
    this.app.listen(3003, () => {
      console.log("Server is running on port 3000");
    });
  }
}

new Server();
