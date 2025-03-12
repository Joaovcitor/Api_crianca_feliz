const express = require("express");
const router = express.Router();

const usersController = require("../controllers/userController");
const checkUserType = require("../utils/checkUserType");
const authenticateJWT = require("../middlewares/authenticateJWT");

router.get("/", authenticateJWT, usersController.show);

router.get(
  "/visitadores",
  authenticateJWT,
  usersController.showAllUsersWithRoleVisitador
);

router.post(
  "/validar-visitador",
  authenticateJWT,
  usersController.validatePendingUserWithRoleVisitador
);

router.get(
  "/visitadores-pendentes",
  authenticateJWT,
  usersController.showAllUsersWithRoleVisitadorThatAtributeIsPending
);

module.exports = router;
