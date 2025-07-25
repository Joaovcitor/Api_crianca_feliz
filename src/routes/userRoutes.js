const express = require("express");
const router = express.Router();

const usersController = require("../controllers/userController");
const checkUserType = require("../utils/checkUserType");
const { isAuthenticated } = require("../middlewares/auth.middleware");

router.get("/", isAuthenticated, usersController.show);

router.get(
  "/visitadores",
  isAuthenticated,
  usersController.showAllUsersWithRoleVisitador
);

router.post(
  "/validar-visitador",
  isAuthenticated,
  usersController.validatePendingUserWithRoleVisitador
);

router.get(
  "/visitadores-pendentes",
  isAuthenticated,
  usersController.showAllUsersWithRoleVisitadorThatAtributeIsPending
);

module.exports = router;
