import { Router } from "express";
import { VisitasPorGeolocalizacaoController } from "./visitasPorGeolocalizacao.controller";
import { isAuthenticated } from "../../core/middlewares/auth.middleware";

const visitasGeoRoutes = Router();

visitasGeoRoutes.get(
  "/",
  isAuthenticated,
  VisitasPorGeolocalizacaoController.getAll
);

visitasGeoRoutes.get(
  "/:id",
  isAuthenticated,
  VisitasPorGeolocalizacaoController.getById
);

visitasGeoRoutes.patch(
  "/:id",
  isAuthenticated,
  VisitasPorGeolocalizacaoController.iniciarVisita
);
visitasGeoRoutes.patch(
  "/:id/finalizar",
  isAuthenticated,
  VisitasPorGeolocalizacaoController.finalizarVisita
);
visitasGeoRoutes.patch(
  "/atualizar-visita/:id",
  isAuthenticated,
  VisitasPorGeolocalizacaoController.update
);
visitasGeoRoutes.get(
  "/visitas-marcadas/:id",
  isAuthenticated,
  VisitasPorGeolocalizacaoController.visitasMarcadasChild
);
visitasGeoRoutes.get(
  "/visitas-marcadas-pregnant/:id",
  isAuthenticated,
  VisitasPorGeolocalizacaoController.visitasMarcadasPregnant
);

visitasGeoRoutes.get(
  "/coordenador/all",
  isAuthenticated,
  VisitasPorGeolocalizacaoController.getAllForCoordenador
);

export default visitasGeoRoutes;
