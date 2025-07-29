const express = require("express");
const router = express.Router();

const etapa4Controller = require("../controllers/formulario5Etapa4Controller");

const { isAuthenticated } = require("../middlewares/auth.middleware");

router.post("/create", isAuthenticated, etapa4Controller.store);

module.exports = router;
