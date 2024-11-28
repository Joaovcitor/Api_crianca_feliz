const express = require("express");
const router = express.Router();

const CaregiverController = require("../controllers/caregiverController");
const ChildController = require("../controllers/childController");
const authenticateJWT = require("../middlewares/authenticateJWT");

router.post(
  "/cadastro",
  authenticateJWT,
  CaregiverController.Store
);

router.post(
  "/deletar/:id",
  authenticateJWT,
  CaregiverController.delete
);

router.get(
  "/showcuidadores",
  authenticateJWT,
  CaregiverController.index
);


router.get(
  "/showinfos/:id",
  authenticateJWT,
  CaregiverController.show
);

router.post(
  "/editar-cuidador/:id",
  authenticateJWT,
  CaregiverController.update
);

router.post(
  "/adicionar-crianca/:id",
  authenticateJWT,
  ChildController.store
);
module.exports = router;
