const express = require('express');
const router = express.Router();

const formsController = require('../controllers/formsController');
const authRequired = require('../middlewares/authRequired');
const authenticateJWT = require("../middlewares/authenticateJWT");

router.get('/:id', authRequired, formsController.renderForms);

router.get('/form5/:id', authenticateJWT, authRequired, formsController.showFormulario5);
router.get('/f7form7/:id', authenticateJWT, authRequired, formsController.showFormulario7);

module.exports = router