const express = require("express");
const router = express.Router();

const authRequired = require("../middlewares/authRequired");
const authenticateJWT = require("../middlewares/authenticateJWT");
const checkUserType = require("../utils/checkUserType");

const NotificacoesSupervisor = require("../controllers/notificacoesSupervisorController");
const NotificacoesVisitador = require("../controllers/notificacoesVisitadorController");

// endpoints dos visitadores
router.get(
  "/minhas-notificacoes",
  authenticateJWT,
  NotificacoesVisitador.index
);

// endpoints dos supervisores
router.get(
  "/supervisor-showall-notificacoes",
  authenticateJWT,
  checkUserType(["supervisor"]),
  NotificacoesSupervisor.index
);

router.post(
  "/supervisor-create-notificacoes",
  authenticateJWT,
  NotificacoesSupervisor.store
);

router.post(
  "/supervisor-create-varias-notificacoes",
  authenticateJWT,
  checkUserType(["supervisor"]),
  NotificacoesSupervisor.storeAllNotificationsOfVisitadores
);

router.put(
  "/supervisor-update",
  authenticateJWT,
  NotificacoesSupervisor.update
);

router.delete(
  "/supervisor-delete-notificacao",
  authenticateJWT,
  NotificacoesSupervisor.delete
);

// endpoints dos coordenadores

module.exports = router;
