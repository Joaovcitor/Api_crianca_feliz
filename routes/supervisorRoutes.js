const express = require("express");
const router = express.Router();

const supervisorController = require("../controllers/supervisorController");
const VisitadorController = require("../controllers/visitadoresController");
const detalhesVisitadores = require("../controllers/detailsVisitadoresController");
const authRequired = require("../middlewares/authRequired");
const checkUserType = require("../utils/checkUserType");
const authenticateJWT = require("../middlewares/authenticateJWT");
const validateCreateUser = require("../middlewares/validateCreateUser")

router.use(checkUserType(["supervisor"]));

router.get(
  "/validar-beneficiario",
  authenticateJWT,
  authRequired,
  supervisorController.showBeneficiarios
);

router.get(
  "/info-dos-meus-visitadores",
  authenticateJWT,
  authRequired,
  detalhesVisitadores.index
);

router.put(
  "/validar-beneficiario",
  authenticateJWT,
  authRequired,
  supervisorController.postBeneficiariosValidar
);

router.post(
  "/cadastrar-visitador",
  authenticateJWT,
  authRequired,
  validateCreateUser,
  VisitadorController.store
);

module.exports = router;
