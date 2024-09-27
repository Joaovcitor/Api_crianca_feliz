const express = require('express');
const router = express.Router();

const familiaController = require('../controllers/familiaController');
const authRequired = require('../middlewares/authRequired');
const authenticateJWT = require("../middlewares/authenticateJWT");


router.get('/showfamilias', authenticateJWT, authRequired, familiaController.show);


module.exports = router