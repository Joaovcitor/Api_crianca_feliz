const express = require("express");
const router = express.Router();

const etapa5Controller = require("../controllers/formulario5Etapa5Controller");

const { isAuthenticated } = require("../middlewares/auth.middleware");

router.post("/create", isAuthenticated, etapa5Controller.store);

module.exports = router;
