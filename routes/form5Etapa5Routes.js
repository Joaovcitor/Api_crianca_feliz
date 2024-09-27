const express = require("express");
const router = express.Router();

const etapa5Controller = require("../controllers/formulario5Etapa5Controller");
const authRequired = require("../middlewares/authRequired");
const authenticateJWT = require("../middlewares/authenticateJWT");

router.post("/create", authenticateJWT, authRequired, etapa5Controller.store);

module.exports = router;

