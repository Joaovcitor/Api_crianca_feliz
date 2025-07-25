const express = require("express");
const router = express.Router();

const CaregiverController = require("../controllers/caregiverController");
const ChildController = require("../controllers/childController");
const { isAuthenticated } = require("../middlewares/auth.middleware");

router.post("/cadastro", isAuthenticated, CaregiverController.Store);

router.post("/deletar/:id", isAuthenticated, CaregiverController.delete);

router.get("/showcuidadores", isAuthenticated, CaregiverController.index);

router.get("/showinfos/:id", isAuthenticated, CaregiverController.show);

router.post(
  "/editar-cuidador/:id",
  isAuthenticated,
  CaregiverController.update
);

router.post("/adicionar-crianca/:id", isAuthenticated, ChildController.store);
module.exports = router;
