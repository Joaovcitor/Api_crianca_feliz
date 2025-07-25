const express = require('express');
const router = express.Router();

const formsController = require('../controllers/formsController');
const authRequired = require('../middlewares/authRequired');
const authenticateJWT = require("../middlewares/authenticateJWT");

router.get('/:id', formsController.renderForms);

router.get('/form5/:id', authenticateJWT, formsController.showFormulario5);
router.get('/f7form7/:id', authenticateJWT, formsController.showFormulario7);

module.exports = router