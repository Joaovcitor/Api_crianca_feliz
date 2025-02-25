const express = require("express");
const router = express.Router();

const homeController = require("../controllers/homeController");
const jwt = require("../middlewares/authenticateJWT");

router.get("/", jwt, homeController.home);

module.exports = router;
