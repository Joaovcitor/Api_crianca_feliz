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

router.get("/meus-supervisores", authenticateJWT, supervisorController.index);

router.post(
  "/validar-visitador-do-supervisor/:id",
  authenticateJWT,
  visitadorController.validarVisitador
);

router.post(
  "/inativar-visitador/:id",
  authenticateJWT,
  visitadorController.inativarContaVisitador
);

router.post(
  "/ativar-visitador/:id",
  authenticateJWT,
  visitadorController.ativarContaVisitador
);

router.get(
  "/meus-visitadores",
  authenticateJWT,
  visitadorController.visitadoresDoCoordenador
);

module.exports = router;
