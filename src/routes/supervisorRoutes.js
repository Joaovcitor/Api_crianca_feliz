const express = require("express");
const router = express.Router();

const detalhesVisitadores = require("../controllers/detailsVisitadoresController");
const { isAuthenticated } = require("../middlewares/auth.middleware");
const SupervisorController = require("../controllers/supervisorController");

router.get(
  "/info-dos-meus-visitadores",
  isAuthenticated,
  detalhesVisitadores.index
);

router.get("/info/:id", isAuthenticated, SupervisorController.show);

module.exports = router;
