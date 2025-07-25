const express = require("express");
const router = express.Router();

const etapa5Controller = require("../controllers/formulario7Etapa5Controller");
const authRequired = require("../middlewares/authRequired");
const { isAuthenticated } = require("../middlewares/auth.middleware");

router.post("/create", isAuthenticated, authRequired, etapa5Controller.store);

module.exports = router;
