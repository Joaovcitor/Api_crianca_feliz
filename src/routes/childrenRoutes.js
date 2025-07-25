const express = require("express");
const router = express.Router();

const childController = require("../controllers/childController");
const { isAuthenticated } = require("../middlewares/auth.middleware");

router.post("/adicionar/:id", isAuthenticated, childController.store);

router.get("/info/:id", isAuthenticated, childController.show);
router.get("/infoall", isAuthenticated, childController.index);

module.exports = router;
