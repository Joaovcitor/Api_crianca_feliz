const express = require("express");
const router = express.Router();

const visitadorController = require("../controllers/visitadoresController");
const supervisorController = require("../controllers/supervisorController");
const { isAuthenticated } = require("../middlewares/auth.middleware");

router.post(
  "/cadastrar-supervisor",
  isAuthenticated,
  supervisorController.store
);

router.get("/meus-supervisores", isAuthenticated, supervisorController.index);

router.post(
  "/validar-visitador-do-supervisor/:id",
  isAuthenticated,
  visitadorController.validarVisitador
);

router.post(
  "/inativar-visitador/:id",
  isAuthenticated,
  visitadorController.inativarContaVisitador
);

router.post(
  "/ativar-visitador/:id",
  isAuthenticated,
  visitadorController.ativarContaVisitador
);

router.get(
  "/meus-visitadores",
  isAuthenticated,
  visitadorController.visitadoresDoCoordenador
);

module.exports = router;
