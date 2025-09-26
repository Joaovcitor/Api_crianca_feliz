import { Router } from "express";

import caregiverRouter from "./caregiver.routes";
import childRouter from "./child.routes";
import homeRouter from "./home.routes";
import authRoute from "./auth.routes";
import visitasGeoRoutes from "./visitasPorGeoLocalizacao.routes";
import supervisorRoutes from "./supervisor.routes";

import faltasRoutes from "./faltas.routes";
import userRoutes from "./user.routes";
import planosDeVisitaRouter from "./planos.routes";
import modelosRouter from "./modeloPlanoDeVisitas.routes";
import coordenadorRouter from "./coordenador.routes";
import visitadoresRoute from "./visitadores.routes";

const routesGlobal = Router();

routesGlobal.use("/", homeRouter);
routesGlobal.use("/cuidador", caregiverRouter);
routesGlobal.use("/crianca", childRouter);
routesGlobal.use("/login", authRoute);
routesGlobal.use("/planos", planosDeVisitaRouter);
routesGlobal.use("/visitasporgeolo", visitasGeoRoutes);
routesGlobal.use("/supervisor", supervisorRoutes);
routesGlobal.use("/modelos", modelosRouter);
routesGlobal.use("/users", userRoutes);
routesGlobal.use("/faltas", faltasRoutes);
routesGlobal.use("/visitadores", visitadoresRoute);
routesGlobal.use("/coordenador", coordenadorRouter);

export default routesGlobal;
