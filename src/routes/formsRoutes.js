const express = require("express");
const router = express.Router();

const formsController = require("../controllers/formsController");
const authRequired = require("../middlewares/authRequired");
const { isAuthenticated } = require("../middlewares/auth.middleware");

router.get("/:id", formsController.renderForms);

router.get("/form5/:id", isAuthenticated, formsController.showFormulario5);
router.get("/f7form7/:id", isAuthenticated, formsController.showFormulario7);

module.exports = router;
