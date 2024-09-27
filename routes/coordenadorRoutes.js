const express = require("express");
const router = express.Router();

const CoordenadorController = require("../controllers/coordenadorController");
const visitadorController = require("../controllers/visitadoresController");
const supervisorController = require("../controllers/supervisorController");
const authRequired = require("../middlewares/authRequired");
const authenticateJWT = require("../middlewares/authenticateJWT");
const checkUserType = require("../utils/checkUserType");


router.post("/cadastro", CoordenadorController.store);

router.use(checkUserType(["coordenador"]));

router.post(
  "/cadastrar-supervisor",
  authenticateJWT,
  authRequired,
  supervisorController.store
);

router.get(
  "/meus-supervisores",
  authenticateJWT,
  authRequired,
  supervisorController.index
);

router.post(
  "/validar-visitador-do-supervisor/:id",
  authenticateJWT,
  authRequired,
  visitadorController.validarVisitador
);

module.exports = router;
