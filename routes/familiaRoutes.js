const express = require('express');
const router = express.Router();

const familiaController = require('../controllers/familiaController');
const authenticateJWT = require("../middlewares/authenticateJWT");


router.get('/showfamilias', authenticateJWT, familiaController.show);


module.exports = router