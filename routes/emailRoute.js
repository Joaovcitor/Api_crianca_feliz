const express = require("express");
const router = express.Router();

const authController = require("../controllers/emailController");

router.post("/resetar", authController.resetPassword);

module.exports = router;
