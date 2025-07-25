const express = require("express");
const router = express.Router();

const detalhesController = require("../controllers/detailsVisitadoresController");
const { checkUserType } = require("../utils/checkUserType");
const { isAuthenticated } = require("../middlewares/auth.middleware");

router.get("/visitador/:id", isAuthenticated, detalhesController.show);
router.get(
  "/coordenador/visitador/:id",
  isAuthenticated,
  detalhesController.showInfoForCoordenador
);
router.get(
  "/relatorio-geral",
  isAuthenticated,
  detalhesController.RelatoriosGerais
);

router.get("/mapa", isAuthenticated, detalhesController.Visitas);
router.get(
  "/visitadores-do-supervisor/:id",
  isAuthenticated,
  detalhesController.visitadoresDoSupervisor
);

module.exports = router;
