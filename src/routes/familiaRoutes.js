const express = require("express");
const router = express.Router();

const familiaController = require("../controllers/familiaController");
const { isAuthenticated } = require("../middlewares/auth.middleware");

router.get("/showfamilias", isAuthenticated, familiaController.show);

module.exports = router;
