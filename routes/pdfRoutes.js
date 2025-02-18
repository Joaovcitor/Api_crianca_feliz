const express = require("express");
const router = express.Router();

const pdfController = require("../controllers/pdfController");
const authRequired = require("../middlewares/authRequired");

router.post("/gerar", pdfController.storePdfPlanos);

module.exports = router;
