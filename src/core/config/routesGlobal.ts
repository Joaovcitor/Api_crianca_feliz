import { Router } from "express";

import caregiverRouter from "../../modules/caregiver/caregiver.routes";
import childRouter from "../../modules/child/child.routes";
import homeRouter from "../../modules/home/home.routes";
import authRoute from "../../modules/auth/auth.routes";
import visitasGeoRoutes from "../../modules/visitasPorGeolocalizacao/visitasPorGeoLocalizacao.routes";
import supervisorRoutes from "../../modules/supervisor/supervisor.routes";
import faltasRoutes from "../../modules/faltas/faltas.routes";
import userRoutes from "../../modules/user/user.routes";
import planosDeVisitaRouter from "../../modules/planoDeVisita/planos.routes";
import modelosRouter from "../../modules/modeloDeVisitas/modeloPlanoDeVisitas.routes";
import coordenadorRouter from "../../modules/coordenador/coordenador.routes";
import visitadoresRoute from "../../modules/visitadores/visitadores.routes";
import timesPunchRouter from "../../modules/timePunch/timePunch.routes";
import postRouter from "../../modules/post/post.route";
import formsRoutes from "../../modules/forms/forms.routes";
import rhRouter from "../../modules/rh/rh.routes";
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
routesGlobal.use("/time-punch", timesPunchRouter);
routesGlobal.use("/post", postRouter);
routesGlobal.use("/forms", formsRoutes);
routesGlobal.use("/rh", rhRouter);

export default routesGlobal;
