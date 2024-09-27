const express = require('express');
const router = express.Router();

const detalhesController = require('../controllers/detailsVisitadoresController');
const authRequired = require('../middlewares/authRequired');
const { checkUserType } = require('../utils/checkUserType');
const authenticateJWT = require("../middlewares/authenticateJWT");

router.get('/visitador/:id', authenticateJWT, authRequired, detalhesController.show);


module.exports = router