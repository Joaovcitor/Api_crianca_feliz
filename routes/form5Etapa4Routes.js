const express = require("express");
const router = express.Router();

const etapa4Controller = require("../controllers/formulario5Etapa4Controller");
const authRequired = require("../middlewares/authRequired");
const authenticateJWT = require("../middlewares/authenticateJWT");

router.post("/create", authenticateJWT, authRequired, etapa4Controller.store);

module.exports = router;

