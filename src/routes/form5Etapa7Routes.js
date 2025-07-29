const express = require("express");
const router = express.Router();

const etapa7Controller = require("../controllers/formulario5Etapa7Controller");

const { isAuthenticated } = require("../middlewares/auth.middleware");

router.post("/create", isAuthenticated, etapa7Controller.store);

module.exports = router;
