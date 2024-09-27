const express = require("express");
const router = express.Router();
const visitasController = require("../controllers/tabelaDeVisitasController");
const authRequired = require("../middlewares/authRequired");
const checkUserType = require("../utils/checkUserType");
const authenticateJWT = require("../middlewares/authenticateJWT");

router.get("/", authenticateJWT, authRequired, visitasController.index);

router.post(
  "/create/:id",
  authenticateJWT,
  authRequired,
  visitasController.store
);

router.get(
  "/show/:id",
  authenticateJWT,
  authRequired,
  visitasController.show
);

router.get(
  "/show/:id",
  authenticateJWT,
  authRequired,
  visitasController.index
);

router.get(
  "/infoall",
  authenticateJWT,
  authRequired,
  visitasController.index
);

router.put(
  "/edit/:id",
  authenticateJWT,
  authRequired,
  visitasController.update
);
router.delete(
  "/delete/:id",
  authenticateJWT,
  authRequired,
  visitasController.delete
);

module.exports = router;
