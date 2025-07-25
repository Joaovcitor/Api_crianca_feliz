const express = require("express");
const router = express.Router();
const visitasController = require("../controllers/tabelaDeVisitasController");
const { isAuthenticated } = require("../middlewares/auth.middleware");

router.get("/", isAuthenticated, visitasController.index);

router.post("/create/:id", isAuthenticated, visitasController.store);
router.post(
  "/create/gestante/:id",
  isAuthenticated,
  visitasController.criarTabelasParaGestante
);

router.get("/show/:id", isAuthenticated, visitasController.show);

router.get("/show/:id", isAuthenticated, visitasController.index);

router.get("/infoall", isAuthenticated, visitasController.index);

router.put("/edit/:id", isAuthenticated, visitasController.update);
router.delete("/delete/:id", isAuthenticated, visitasController.delete);

module.exports = router;
