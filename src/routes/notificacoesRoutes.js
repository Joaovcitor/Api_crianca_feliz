const express = require("express");
const router = express.Router();

const { isAuthenticated } = require("../middlewares/auth.middleware");

const checkUserType = require("../utils/checkUserType");

const NotificacoesSupervisor = require("../controllers/notificacoesSupervisorController");
const NotificacoesCoordenador = require("../controllers/notificacoesCoordenadorController");
const NotificacoesVisitador = require("../controllers/notificacoesVisitadorController");

// endpoints dos visitadores
router.get(
  "/minhas-notificacoes",
  isAuthenticated,
  NotificacoesVisitador.index
);

// endpoints dos supervisores
router.get(
  "/supervisor-showall-notificacoes",
  isAuthenticated,
  // checkUserType(["supervisor"]),
  NotificacoesSupervisor.index
);

router.post(
  "/supervisor-create-notificacoes",
  isAuthenticated,
  NotificacoesSupervisor.store
);

router.post(
  "/supervisor-create-varias-notificacoes",
  isAuthenticated,
  // checkUserType(["supervisor"]),
  NotificacoesSupervisor.storeAllNotificationsOfVisitadores
);

router.put(
  "/supervisor-update",
  isAuthenticated,
  NotificacoesSupervisor.update
);

router.delete(
  "/supervisor-delete-notificacao",
  isAuthenticated,
  NotificacoesSupervisor.delete
);

// endpoints dos coordenadores
router.get(
  "/supervisor-showall-notificacoes",
  isAuthenticated,
  // checkUserType(["coordenador"]),
  NotificacoesCoordenador.index
);

router.post(
  "/coordenador-create-notificacoes",
  isAuthenticated,
  NotificacoesCoordenador.store
);

router.post(
  "/coordenador-create-varias-notificacoes",
  isAuthenticated,
  // checkUserType(["coordenador"]),
  NotificacoesCoordenador.storeAllNotificationsOfVisitadores
);

router.put(
  "/coordenador-update",
  isAuthenticated,
  NotificacoesCoordenador.update
);

router.delete(
  "/coordenador-delete-notificacao",
  isAuthenticated,
  NotificacoesCoordenador.delete
);
module.exports = router;
