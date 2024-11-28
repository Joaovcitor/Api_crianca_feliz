const express = require("express");
const router = express.Router();

const planosDeVisitaController = require("../controllers/planoDeVisitaController");
const childController = require("../controllers/childController");
const authRequired = require("../middlewares/authRequired");
const authenticateJWT = require("../middlewares/authenticateJWT");

const checkUserType = require("../utils/checkUserType");


router.get("/info", authenticateJWT, childController.index);

router.get(
  "/infosingleplano/:id",
  authenticateJWT,
  planosDeVisitaController.show
);

router.get(
  "/infoallplanos/:id",
  authenticateJWT,
  planosDeVisitaController.index
);

router.get(
  "/infoallplanoshome",
  authenticateJWT,
  planosDeVisitaController.relatorioHome
);

router.post(
  "/planosdacrianca/:id",
  authenticateJWT,
  planosDeVisitaController.deletePlano
);

router.post(
  "/criarplano/:id",
  authenticateJWT,
  planosDeVisitaController.store
);

router.put(
  "/editar/:id",
  authenticateJWT,
  planosDeVisitaController.update
);

module.exports = router;
