const express = require("express");
const router = express.Router();

const childController = require("../controllers/childController");
const authRequired = require("../middlewares/authRequired");
const authenticateJWT = require("../middlewares/authenticateJWT");

router.post(
  "/adicionar/:id",
  authenticateJWT,
  childController.store
);

router.get("/info/:id", authenticateJWT, childController.show);
router.get("/infoall", authenticateJWT, childController.index);

module.exports = router;
