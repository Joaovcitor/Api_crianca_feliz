const express = require("express");
const router = express.Router();

const planosDeVisitaController = require("../controllers/planoDeVisitaController");
const childController = require("../controllers/childController");
const authenticateJWT = require("../middlewares/authenticateJWT");

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
  "/planos-da-gestante/:id",
  authenticateJWT,
  planosDeVisitaController.planosDaGestante
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

router.post("/criarplano/:id", authenticateJWT, planosDeVisitaController.store);
router.post(
  "/criarplano-gravida/:id",
  authenticateJWT,
  planosDeVisitaController.storePlanoForCaregiver
);

router.post(
  "/criarplanocaregiver/:id",
  authenticateJWT,
  planosDeVisitaController.storePlanoForCaregiver
);

router.put("/editar/:id", authenticateJWT, planosDeVisitaController.update);

module.exports = router;
