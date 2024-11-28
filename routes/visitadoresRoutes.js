const express = require("express");
const router = express.Router();

const visitadoresController = require("../controllers/visitadoresController");
const VisitasController = require("../controllers/visitasGeolocationController");
const checkUserType = require("../utils/checkUserType");
const authenticateJWT = require("../middlewares/authenticateJWT");


router.get("/showInformations", visitadoresController.show);

router.post(
  "/editarperfilvisitador/",
  authenticateJWT,
  visitadoresController.editPost
);

router.get(
  "/mostrar-infos",
  authenticateJWT,
  visitadoresController.show
);

router.post(
  "/realizarvisita/:id",
  authenticateJWT,
  VisitasController.store
);

router.post(
  "/finalizarvisita/:id",
  authenticateJWT,
  VisitasController.update
);

router.post(
  "/finalizarvisitapendente/:id",
  authenticateJWT,
  VisitasController.update
);

module.exports = router;
