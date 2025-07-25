const express = require("express");
const router = express.Router();

const visitadoresController = require("../controllers/visitadoresController");
const VisitasController = require("../controllers/visitasGeolocationController");
const checkUserType = require("../utils/checkUserType");
const { isAuthenticated } = require("../middlewares/auth.middleware");

router.get("/showInformations", visitadoresController.show);

router.post(
  "/editarperfilvisitador/",
  isAuthenticated,
  visitadoresController.editPost
);

router.get("/:id", isAuthenticated, visitadoresController.show);

router.post("/realizarvisita/:id", isAuthenticated, VisitasController.store);

router.post("/finalizarvisita/:id", isAuthenticated, VisitasController.update);

router.post(
  "/finalizarvisitapendente/:id",
  isAuthenticated,
  VisitasController.update
);

module.exports = router;
