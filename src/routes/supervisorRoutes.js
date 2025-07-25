const express = require("express");
const router = express.Router();

const VisitadorController = require("../controllers/visitadoresController");
const detalhesVisitadores = require("../controllers/detailsVisitadoresController");
const childController = require("../controllers/childController");
const caregiverController = require("../controllers/caregiverController");
const checkUserType = require("../utils/checkUserType");
const { isAuthenticated } = require("../middlewares/auth.middleware");
const validateCreateUser = require("../middlewares/validateCreateUser");
const SupervisorController = require("../controllers/supervisorController");

router.get(
  "/info-dos-meus-visitadores",
  isAuthenticated,
  detalhesVisitadores.index
);

router.get("/info/:id", isAuthenticated, SupervisorController.show);

router.get(
  "/beneficiarios-pendentes",
  isAuthenticated,
  caregiverController.showBeneficiarios
);

router.put(
  "/validar-cuidador",
  isAuthenticated,
  caregiverController.validarCaregiver
);

router.put("/validar-crianca", isAuthenticated, childController.validarChild);

router.post(
  "/cadastrar-visitador",
  isAuthenticated,
  validateCreateUser,
  VisitadorController.store
);

router.get("/meus-visitadores", isAuthenticated, VisitadorController.index);

module.exports = router;
