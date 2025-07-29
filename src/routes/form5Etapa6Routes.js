const express = require("express");
const router = express.Router();

const etapa6Controller = require("../controllers/formulario5Etapa6Controller");

const { isAuthenticated } = require("../middlewares/auth.middleware");

router.post("/create", isAuthenticated, etapa6Controller.store);

module.exports = router;
