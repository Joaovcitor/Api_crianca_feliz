const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const authenticateJWT = require("../middlewares/authenticateJWT")

router.post("/", authController.loginPost);
router.patch("/editar", authenticateJWT, authController.edit)

router.get("/logout", authController.logout);

module.exports = router;
