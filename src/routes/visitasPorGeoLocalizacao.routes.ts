import { Router } from "express";
import { VisitasPorGeolocalizacaoController } from "../controllers/visitasPorGeolocalizacao.controller";
import { isAuthenticated } from "../middlewares/auth.middleware";

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

visitasGeoRoutes.post(
  "/",
  isAuthenticated,
  VisitasPorGeolocalizacaoController.marcarVisita
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

export default visitasGeoRoutes;
