const express = require("express");
const router = express.Router();

const faltasController = require("../controllers/faltasController");
const jwt = require("../middlewares/authenticateJWT");

router.post("/", jwt, faltasController.store);
router.get("/", jwt, faltasController.todasAsFaltasDosUsuarios);
router.get(
  "/faltas-geradas-pelo-user",
  jwt,
  faltasController.faltasQueORegistradorDeu
);
router.get("/faltas-que-o-user-levou/:id", jwt, faltasController.show);
router.post(
  "/pedir-para-invalidar",
  jwt,
  faltasController.pedirParaInvalidarFalta
);
router.post("/invalidar-falta", jwt, faltasController.invalidarFalta);

module.exports = router;
