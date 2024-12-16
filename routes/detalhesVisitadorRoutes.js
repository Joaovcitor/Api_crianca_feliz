const express = require("express");
const router = express.Router();

const detalhesController = require("../controllers/detailsVisitadoresController");
const { checkUserType } = require("../utils/checkUserType");
const authenticateJWT = require("../middlewares/authenticateJWT");

router.get("/visitador/:id", authenticateJWT, detalhesController.show);
router.get(
  "/coordenador/visitador/:id",
  authenticateJWT,
  detalhesController.showInfoForCoordenador
);
router.get(
  "/relatorio-geral",
  authenticateJWT,
  detalhesController.RelatoriosGerais
);

module.exports = router;
