const express = require("express");
const router = express.Router();

const CoordenadorController = require("../controllers/coordenadorController");
const visitadorController = require("../controllers/visitadoresController");
const supervisorController = require("../controllers/supervisorController");
const authenticateJWT = require("../middlewares/authenticateJWT");
const checkUserType = require("../utils/checkUserType");


router.post("/cadastro", CoordenadorController.store);


router.post(
  "/cadastrar-supervisor",
  authenticateJWT,
  supervisorController.store
);

router.get(
  "/meus-supervisores",
  authenticateJWT,
  supervisorController.index
);

router.post(
  "/validar-visitador-do-supervisor/:id",
  authenticateJWT,
  visitadorController.validarVisitador
);

module.exports = router;
