const express = require("express");
const router = express.Router();

const planosDeVisitaController = require("../controllers/planoDeVisitaController");
const childController = require("../controllers/childController");
const { isAuthenticated } = require("../middlewares/auth.middleware");

router.get("/info", isAuthenticated, childController.index);

router.get(
  "/infosingleplano/:id",
  isAuthenticated,
  planosDeVisitaController.show
);

router.get(
  "/infoallplanos/:id",
  isAuthenticated,
  planosDeVisitaController.index
);

router.get(
  "/planos-da-gestante/:id",
  isAuthenticated,
  planosDeVisitaController.planosDaGestante
);

router.get(
  "/infoallplanoshome",
  isAuthenticated,
  planosDeVisitaController.relatorioHome
);

router.post(
  "/planosdacrianca/:id",
  isAuthenticated,
  planosDeVisitaController.deletePlano
);

router.post("/criarplano/:id", isAuthenticated, planosDeVisitaController.store);
router.post(
  "/criarplano-gravida/:id",
  isAuthenticated,
  planosDeVisitaController.storePlanoForCaregiver
);

router.post(
  "/criarplanocaregiver/:id",
  isAuthenticated,
  planosDeVisitaController.storePlanoForCaregiver
);

router.put("/editar/:id", isAuthenticated, planosDeVisitaController.update);

module.exports = router;
