const express = require("express");
const router = express.Router();

const visitadoresController = require("../controllers/visitadoresController");
const VisitasController = require("../controllers/visitasGeolocationController");
const authRequired = require("../middlewares/authRequired");
const checkUserType = require("../utils/checkUserType");
const authenticateJWT = require("../middlewares/authenticateJWT");

router.use(checkUserType(["visitador"]));

router.get("/showInformations", checkUserType(["visitador"]), authRequired, visitadoresController.show);

router.post(
  "/editarperfilvisitador/",
  authenticateJWT,
  authRequired,
  visitadoresController.editPost
);

router.get(
  "/mostrar-infos",
  authenticateJWT,
  authRequired,
  visitadoresController.show
);

router.post(
  "/realizarvisita/:id",
  authenticateJWT,
  authRequired,
  VisitasController.store
);

router.post(
  "/finalizarvisita/:id",
  authenticateJWT,
  authRequired,
  VisitasController.update
);

router.post(
  "/finalizarvisitapendente/:id",
  authenticateJWT,
  authRequired,
  VisitasController.update
);

module.exports = router;
