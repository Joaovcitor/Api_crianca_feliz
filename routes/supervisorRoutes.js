const express = require("express");
const router = express.Router();

const VisitadorController = require("../controllers/visitadoresController");
const detalhesVisitadores = require("../controllers/detailsVisitadoresController");
const childController = require("../controllers/childController");
const caregiverController = require("../controllers/caregiverController");
const checkUserType = require("../utils/checkUserType");
const authenticateJWT = require("../middlewares/authenticateJWT");
const validateCreateUser = require("../middlewares/validateCreateUser");
const SupervisorController = require("../controllers/supervisorController");

router.get(
  "/info-dos-meus-visitadores",
  authenticateJWT,
  detalhesVisitadores.index
);

router.get("/info/:id", authenticateJWT, SupervisorController.show);

router.get(
  "/beneficiarios-pendentes",
  authenticateJWT,
  caregiverController.showBeneficiarios
);

router.put(
  "/validar-cuidador",
  authenticateJWT,
  caregiverController.validarCaregiver
);

router.put("/validar-crianca", authenticateJWT, childController.validarChild);

router.post(
  "/cadastrar-visitador",
  authenticateJWT,
  validateCreateUser,
  VisitadorController.store
);

module.exports = router;
