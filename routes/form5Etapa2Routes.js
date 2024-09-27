const express = require("express");
const router = express.Router();

const etapa2Controller = require("../controllers/formulario5Etapa2Controller");
const authRequired = require("../middlewares/authRequired");
const authenticateJWT = require("../middlewares/authenticateJWT");

router.post("/create", authenticateJWT, authRequired, etapa2Controller.store);

module.exports = router;
