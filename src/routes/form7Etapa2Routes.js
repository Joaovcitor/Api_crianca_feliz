const express = require("express");
const router = express.Router();

const etapa2Controller = require("../controllers/formulario7Etapa2Controller");
const authRequired = require("../middlewares/authRequired");
const { isAuthenticated } = require("../middlewares/auth.middleware");

router.post("/create", isAuthenticated, authRequired, etapa2Controller.store);

module.exports = router;
