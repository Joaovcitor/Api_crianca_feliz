const express = require("express");
const router = express.Router();

const VisitasController = require("../controllers/visitasGeolocationController");
const authRequired = require("../middlewares/authRequired");
const checkUserType = require("../utils/checkUserType");
const authenticateJWT = require("../middlewares/authenticateJWT");


router.put(
  "/finalizar-visita/:id",
  authenticateJWT,
  authRequired,
  VisitasController.update
);
router.post(
  "/realizarvisita/:id",
  authenticateJWT,
  authRequired,
  VisitasController.store
);

router.post("/agendar-visita/:id", authenticateJWT, authRequired, VisitasController.agendaVisita);
router.get("/visitas-marcadas/:id", authenticateJWT, authRequired, VisitasController.ShowVisitasMarcadas)
router.get("/verificar-visita/:id", authenticateJWT, authRequired, VisitasController.show)
router.post(
  "/realizarjustificativa/:id",
  authenticateJWT,
  authRequired,
  VisitasController.storeJustificativaBeneficiarioAusente
);

router.get(
  "/finalizar-visita-pendente",
  authenticateJWT,
  authRequired,
  VisitasController.visitasPendentes
);

router.post(
  "/finalizarvisitapendente",
  authenticateJWT,
  authRequired,
  VisitasController.update
);


// router.use(checkUserType(["supervisor"]));
router.get(
  "/visitas/:id",
  authenticateJWT,
  authRequired,
  VisitasController.index
);

router.post(
  "/validar-visita/:id",
  authenticateJWT,
  authRequired,
  VisitasController.validarVisita
);

router.post(
  "/invalidar-visita/:id",
  authenticateJWT,
  authRequired,
  VisitasController.invalidarVisita
);



module.exports = router;
