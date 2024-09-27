const express = require("express");
const router = express.Router();

const planosDeVisitaController = require("../controllers/planoDeVisitaController");
const childController = require("../controllers/childController");
const authRequired = require("../middlewares/authRequired");
const authenticateJWT = require("../middlewares/authenticateJWT");

const checkUserType = require("../utils/checkUserType");

router.use(checkUserType(["visitador"]));

router.get("/info", authenticateJWT, authRequired, childController.index);

router.get(
  "/infosingleplano/:id",
  authenticateJWT,
  authRequired,
  planosDeVisitaController.show
);

router.get(
  "/infoallplanos/:id",
  authenticateJWT,
  authRequired,
  planosDeVisitaController.index
);

router.get(
  "/infoallplanoshome",
  authenticateJWT,
  authRequired,
  planosDeVisitaController.relatorioHome
);

router.post(
  "/planosdacrianca/:id",
  authenticateJWT,
  authRequired,
  planosDeVisitaController.deletePlano
);

router.post(
  "/criarplano/:id",
  authenticateJWT,
  authRequired,
  planosDeVisitaController.store
);

router.put(
  "/editar/:id",
  authenticateJWT,
  authRequired,
  planosDeVisitaController.update
);

module.exports = router;
