const express = require("express");
const router = express.Router();

const etapa7Controller = require("../controllers/formulario7Etapa7Controller");
const authRequired = require("../middlewares/authRequired");
const authenticateJWT = require("../middlewares/authenticateJWT");

router.post("/create", authenticateJWT, authRequired, etapa7Controller.store);

module.exports = router;
