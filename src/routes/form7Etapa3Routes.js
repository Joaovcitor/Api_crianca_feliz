const express = require("express");
const router = express.Router();

const etapa3Controller = require("../controllers/formulario7Etapa3Controller");

const { isAuthenticated } = require("../middlewares/auth.middleware");

router.post("/create", isAuthenticated, etapa3Controller.store);

module.exports = router;
