const express = require("express");
const router = express.Router();

const childController = require("../controllers/childController");
const authRequired = require("../middlewares/authRequired");
const authenticateJWT = require("../middlewares/authenticateJWT");

router.post(
  "/adicionar/:id",
  authenticateJWT,
  authRequired,
  childController.store
);

router.get("/info/:id", authenticateJWT, authRequired, childController.show);
router.get("/infoall", authenticateJWT, authRequired, childController.index);

module.exports = router;
