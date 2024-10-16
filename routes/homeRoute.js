const express = require('express');
const router = express.Router();

const homeController = require('../controllers/homeController');
const authRequired = require('../middlewares/authRequired');
const jwt = require("../middlewares/authenticateJWT")

router.get('/', jwt, authRequired, homeController.home);

module.exports = router