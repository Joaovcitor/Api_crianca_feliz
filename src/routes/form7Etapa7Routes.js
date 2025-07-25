const express = require("express");
const router = express.Router();

const etapa7Controller = require("../controllers/formulario7Etapa7Controller");
const authRequired = require("../middlewares/authRequired");
const { isAuthenticated } = require("../middlewares/auth.middleware");

router.post("/create", isAuthenticated, authRequired, etapa7Controller.store);

module.exports = router;
