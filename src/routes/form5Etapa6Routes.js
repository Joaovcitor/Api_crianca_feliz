const express = require("express");
const router = express.Router();

const etapa6Controller = require("../controllers/formulario5Etapa6Controller");
const authRequired = require("../middlewares/authRequired");
const authenticateJWT = require("../middlewares/authenticateJWT");

router.post("/create", authenticateJWT, authRequired, etapa6Controller.store);

module.exports = router;

