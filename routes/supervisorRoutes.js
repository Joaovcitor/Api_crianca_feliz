const express = require("express");
const router = express.Router();

const supervisorController = require("../controllers/supervisorController");
const VisitadorController = require("../controllers/visitadoresController");
const detalhesVisitadores = require("../controllers/detailsVisitadoresController");
const childController = require("../controllers/childController")
const caregiverController = require("../controllers/caregiverController")
const authRequired = require("../middlewares/authRequired");
const checkUserType = require("../utils/checkUserType");
const authenticateJWT = require("../middlewares/authenticateJWT");
const validateCreateUser = require("../middlewares/validateCreateUser")

router.use(checkUserType(["supervisor"]));


router.get(
  "/info-dos-meus-visitadores",
  authenticateJWT,
  authRequired,
  detalhesVisitadores.index
);

router.get(
  "/beneficiarios-pendentes",
  authenticateJWT,
  authRequired,
  caregiverController.showBeneficiarios
);

router.put(
  "/validar-cuidador",
  authenticateJWT,
  authRequired,
  caregiverController.validarCaregiver
);

router.put(
  "/validar-crianca",
  authenticateJWT,
  authRequired,
  childController.validarChild
);

router.post(
  "/cadastrar-visitador",
  authenticateJWT,
  authRequired,
  validateCreateUser,
  VisitadorController.store
);

module.exports = router;
