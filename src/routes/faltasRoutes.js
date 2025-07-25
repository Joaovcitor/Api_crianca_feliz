const express = require("express");
const router = express.Router();

const faltasController = require("../controllers/faltasController");
const { isAuthenticated } = require("../middlewares/auth.middleware");

router.post("/", isAuthenticated, faltasController.store);
router.get("/", isAuthenticated, faltasController.todasAsFaltasDosUsuarios);
router.get(
  "/faltas-geradas-pelo-user",
  isAuthenticated,
  faltasController.faltasQueORegistradorDeu
);
router.get(
  "/faltas-que-o-user-levou/:id",
  isAuthenticated,
  faltasController.show
);
router.post(
  "/pedir-para-invalidar",
  isAuthenticated,
  faltasController.pedirParaInvalidarFalta
);
router.post(
  "/invalidar-falta",
  isAuthenticated,
  faltasController.invalidarFalta
);

module.exports = router;
