const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const { isAuthenticated } = require("../middlewares/auth.middleware");

router.post("/", authController.loginPost);
router.patch("/editar", isAuthenticated, authController.editPassword);
router.patch("/editar-email", isAuthenticated, authController.editEmail);
router.patch("/resetar-senha/:token", authController.resetPassword);

router.get("/logout", authController.logout);

module.exports = router;
