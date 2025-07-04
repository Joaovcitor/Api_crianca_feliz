require("dotenv").config({
  path:
    process.env.NODE_ENV === "production"
      ? ".env.production"
      : ".env.development",
});
const express = require("express");
// const os = require("os");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");

// function getLocalIP() {
//   const interfaces = os.networkInterfaces();
//   for (const ifaceName in interfaces) {
//     for (const iface of interfaces[ifaceName]) {
//       if (iface.family === "IPv4" && !iface.internal) {
//         return iface.address;
//       }
//     }
//   }
//   return "localhost";
// }

class Server {
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

  configureRoutes() {
    const express = require("express");

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
    const emailRouter = require("./routes/emailRoute");
    const usersRoutes = require("./routes/userRoutes");
    const faltasRoutes = require("./routes/faltasRoutes");
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
    apiBase.use("/users", usersRoutes);
    apiBase.use("/faltas", faltasRoutes);

    this.app.use("/apiv1", apiBase);
  }

  startServer() {
    this.app.listen(3003, () => {
      console.log("Server is running on port 3003");
    });
  }
}

new Server();
