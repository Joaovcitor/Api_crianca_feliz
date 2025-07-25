const express = require("express");
const router = express.Router();

const etapa4Controller = require("../controllers/formulario5Etapa4Controller");
const authRequired = require("../middlewares/authRequired");
const { isAuthenticated } = require("../middlewares/auth.middleware");

router.post("/create", isAuthenticated, authRequired, etapa4Controller.store);

module.exports = router;
