const express = require("express");
const router = express.Router();
const visitasController = require("../controllers/tabelaDeVisitasController");
const authenticateJWT = require("../middlewares/authenticateJWT");

router.get("/", authenticateJWT, visitasController.index);

router.post("/create/:id", authenticateJWT, visitasController.store);
router.post(
  "/create/gestante/:id",
  authenticateJWT,
  visitasController.criarTabelasParaGestante
);

router.get("/show/:id", authenticateJWT, visitasController.show);

router.get("/show/:id", authenticateJWT, visitasController.index);

router.get("/infoall", authenticateJWT, visitasController.index);

router.put("/edit/:id", authenticateJWT, visitasController.update);
router.delete("/delete/:id", authenticateJWT, visitasController.delete);

module.exports = router;
