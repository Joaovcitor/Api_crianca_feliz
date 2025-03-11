const express = require("express");
const router = express.Router();

const VisitasController = require("../controllers/visitasGeolocationController");
const checkUserType = require("../utils/checkUserType");
const authenticateJWT = require("../middlewares/authenticateJWT");

router.get(
  "/visitas-invalidadas",
  authenticateJWT,
  VisitasController.showVisitasInvalidadas
);

router.put("/finalizar-visita/:id", authenticateJWT, VisitasController.update);
router.post("/realizarvisita/:id", authenticateJWT, VisitasController.store);

router.post(
  "/agendar-visita/:id",
  authenticateJWT,
  VisitasController.agendaVisita
);
router.get(
  "/visitas-marcadas/:id",
  authenticateJWT,
  VisitasController.ShowVisitasMarcadas
);
router.get("/verificar-visita/:id", authenticateJWT, VisitasController.show);
router.post(
  "/realizarjustificativa/:id",
  authenticateJWT,
  VisitasController.storeJustificativaBeneficiarioAusente
);

router.get(
  "/finalizar-visita-pendente",
  authenticateJWT,
  VisitasController.visitasPendentes
);

router.post(
  "/finalizarvisitapendente",
  authenticateJWT,
  VisitasController.update
);

// router.use(checkUserType(["supervisor"]));
router.get("/visitas/:id", authenticateJWT, VisitasController.index);

router.post(
  "/validar-visita/:id",
  authenticateJWT,
  VisitasController.validarVisita
);

router.post(
  "/invalidar-visita/:id",
  authenticateJWT,
  VisitasController.invalidarVisita
);

module.exports = router;
