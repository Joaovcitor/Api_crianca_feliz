const express = require("express");
const router = express.Router();

const etapa2Controller = require("../controllers/formulario7Etapa2Controller");

const { isAuthenticated } = require("../middlewares/auth.middleware");

router.post("/create", isAuthenticated, etapa2Controller.store);

module.exports = router;
