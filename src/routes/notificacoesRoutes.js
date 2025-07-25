const express = require("express");
const router = express.Router();

const authenticateJWT = require("../middlewares/authenticateJWT");
const checkUserType = require("../utils/checkUserType");

const NotificacoesSupervisor = require("../controllers/notificacoesSupervisorController");
const NotificacoesCoordenador = require("../controllers/notificacoesCoordenadorController");
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
router.get(
  "/supervisor-showall-notificacoes",
  authenticateJWT,
  checkUserType(["coordenador"]),
  NotificacoesCoordenador.index
);

router.post(
  "/coordenador-create-notificacoes",
  authenticateJWT,
  NotificacoesCoordenador.store
);

router.post(
  "/coordenador-create-varias-notificacoes",
  authenticateJWT,
  checkUserType(["coordenador"]),
  NotificacoesCoordenador.storeAllNotificationsOfVisitadores
);

router.put(
  "/coordenador-update",
  authenticateJWT,
  NotificacoesCoordenador.update
);

router.delete(
  "/coordenador-delete-notificacao",
  authenticateJWT,
  NotificacoesCoordenador.delete
);
module.exports = router;
