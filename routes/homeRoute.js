const express = require('express');
const router = express.Router();

const homeController = require('../controllers/homeController');
const authRequired = require('../middlewares/authRequired');

router.get('/', authRequired, homeController.home);

module.exports = router