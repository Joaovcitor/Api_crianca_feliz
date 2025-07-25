const express = require("express");
const router = express.Router();

const VisitasController = require("../controllers/visitasGeolocationController");
const { isAuthenticated } = require("../middlewares/auth.middleware");

router.get(
  "/visitas-invalidadas",
  isAuthenticated,
  VisitasController.showVisitasInvalidadas
);

router.put("/finalizar-visita/:id", isAuthenticated, VisitasController.update);
router.post("/realizarvisita/:id", isAuthenticated, VisitasController.store);

router.post(
  "/agendar-visita/:id",
  isAuthenticated,
  VisitasController.agendaVisita
);
router.post(
  "/agendar-visita-gravida/:id",
  isAuthenticated,
  VisitasController.agendaVisitaGestante
);
router.get(
  "/visitas-marcadas/:id",
  isAuthenticated,
  VisitasController.ShowVisitasMarcadas
);
router.get(
  "/visitas-marcadas-gestantes/:id",
  isAuthenticated,
  VisitasController.ShowVisitasMarcadasGestantes
);
router.get("/verificar-visita/:id", isAuthenticated, VisitasController.show);
router.post(
  "/realizarjustificativa/:id",
  isAuthenticated,
  VisitasController.storeJustificativaBeneficiarioAusente
);

router.get(
  "/finalizar-visita-pendente",
  isAuthenticated,
  VisitasController.visitasPendentes
);

router.post(
  "/finalizarvisitapendente",
  isAuthenticated,
  VisitasController.update
);

// router.use(checkUserType(["supervisor"]));
router.get("/visitas/:id", isAuthenticated, VisitasController.index);

router.post(
  "/validar-visita/:id",
  isAuthenticated,
  VisitasController.validarVisita
);

router.post(
  "/invalidar-visita/:id",
  isAuthenticated,
  VisitasController.invalidarVisita
);

module.exports = router;
