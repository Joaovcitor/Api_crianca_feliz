const express = require("express");
const router = express.Router();

const etapa2Controller = require("../controllers/formulario5Etapa2Controller");
const authenticateJWT = require("../middlewares/authenticateJWT");

router.post("/create", authenticateJWT, etapa2Controller.store);

module.exports = router;
