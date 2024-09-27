const express = require("express");
const router = express.Router();

const authRequired = require("../middlewares/authRequired");
const authenticateJWT = require("../middlewares/authenticateJWT");
// const checkUserType = require("../utils/checkUserType");

const NotificacoesSupervisor = require("../controllers/notificacoesSupervisorController");
const NotificacoesVisitador = require("../controllers/notificacoesVisitadorController");

// endpoints dos visitadores
router.get("/minhas-notificacoes", authRequired, authenticateJWT, NotificacoesVisitador.index);

// router.use(checkUserType(["supervisor"]));

// endpoints dos supervisores
router.get(
  "/supervisor-showall-notificacoes",
  authRequired,
  authenticateJWT,
  NotificacoesSupervisor.index
);

router.post(
  "/supervisor-create-notificacoes",
  authRequired,
  authenticateJWT,
  NotificacoesSupervisor.store
);

router.post(
  "/supervisor-create-varias-notificacoes",
  authRequired,
  authenticateJWT,
  NotificacoesSupervisor.storeAllNotificationsOfVisitadores
);

router.put(
  "/supervisor-update",
  authRequired,
  authenticateJWT,
  NotificacoesSupervisor.update
);

router.delete(
  "/supervisor-delete-notificacao",
  authRequired,
  authenticateJWT,
  NotificacoesSupervisor.delete
);

// endpoints dos coordenadores

module.exports = router;
