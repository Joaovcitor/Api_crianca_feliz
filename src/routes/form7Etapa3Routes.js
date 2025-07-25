const express = require("express");
const router = express.Router();

const etapa3Controller = require("../controllers/formulario7Etapa3Controller");
const authRequired = require("../middlewares/authRequired");
const authenticateJWT = require("../middlewares/authenticateJWT");

router.post("/create", authenticateJWT, authRequired, etapa3Controller.store);

module.exports = router;

