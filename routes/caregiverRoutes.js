const express = require("express");
const router = express.Router();

const CaregiverController = require("../controllers/caregiverController");
const ChildController = require("../controllers/childController");
const authRequired = require("../middlewares/authRequired");
const authenticateJWT = require("../middlewares/authenticateJWT");

router.post(
  "/cadastro",
  authenticateJWT,
  authRequired,
  CaregiverController.Store
);

router.post(
  "/deletar/:id",
  authenticateJWT,
  authRequired,
  CaregiverController.delete
);

router.get(
  "/showcuidadores",
  authenticateJWT,
  authRequired,
  CaregiverController.index
);


router.get(
  "/showinfos/:id",
  authRequired,
  authenticateJWT,
  CaregiverController.show
);

router.post(
  "/editar-cuidador/:id",
  authenticateJWT,
  authRequired,
  CaregiverController.update
);

router.post(
  "/adicionar-crianca/:id",
  authenticateJWT,
  authRequired,
  ChildController.store
);
module.exports = router;
