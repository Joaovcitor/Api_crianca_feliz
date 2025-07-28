const express = require("express");
const router = express.Router();

const VisitadorController = require("../controllers/visitadoresController");
const detalhesVisitadores = require("../controllers/detailsVisitadoresController");
const { isAuthenticated } = require("../middlewares/auth.middleware");
const validateCreateUser = require("../middlewares/validateCreateUser");
const SupervisorController = require("../controllers/supervisorController");

router.get(
  "/info-dos-meus-visitadores",
  isAuthenticated,
  detalhesVisitadores.index
);

router.get("/info/:id", isAuthenticated, SupervisorController.show);

router.post(
  "/cadastrar-visitador",
  isAuthenticated,
  validateCreateUser,
  VisitadorController.store
);

router.get("/meus-visitadores", isAuthenticated, VisitadorController.index);

module.exports = router;
