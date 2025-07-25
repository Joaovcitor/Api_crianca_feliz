const db = require("../db/conn");
const { DataTypes } = require("sequelize");
const Users = require("./Users");

const Notificacoes = db.define("Notificacoes", {
  notificacao_tipo: {
    type: DataTypes.ENUM("Evento", "Reunião", "Falta", "Outras"),
    allowNull: false,
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

Users.hasMany(Notificacoes, {
  as: "notificacoesVisitador",
  foreignKey: "visitadorId",
  scope: { role: "visitador" },
});
Notificacoes.belongsTo(Users, {
  as: "visitador",
  foreignKey: "visitadorId",
  onDelete: 'SET NULL',
  
});

Users.hasMany(Notificacoes, {
  as: "notificacoesSupervisor",
  foreignKey: "supervisorId",
  scope: { role: "supervisor" },
});
Notificacoes.belongsTo(Users, {
  as: "supervisor",
  foreignKey: "supervisorId",
  onDelete: 'SET NULL'
});

Users.hasMany(Notificacoes, {
  as: "notificacoesCoordenador",
  foreignKey: "coordenadorId",
  scope: { role: "coordenador" },
});
Notificacoes.belongsTo(Users, {
  as: "coordenador",
  foreignKey: "coordenadorId",
  onDelete: 'SET NULL'
});

module.exports = Notificacoes;
