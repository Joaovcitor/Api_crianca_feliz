const express = require("express");
const router = express.Router();

const { isAuthenticated } = require("../middlewares/auth.middleware");

router.post("/editarperfilvisitador/", isAuthenticated);

module.exports = router;
