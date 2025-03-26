const { DataTypes } = require("sequelize");
const db = require("../db/conn");
const User = require("./Users");
const Child = require("./Child");
const Caregiver = require("./Caregiver");

const Tabelas_de_visita = db.define("TabelasDeVisitas", {
  dateOfvisit: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  childVisited: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dayOfVisit: {
    type: DataTypes.ENUM("Segunda", "Terça", "Quarta", "Quinta", "Sexta"),
    allowNull: false,
  },
  period: {
    type: DataTypes.ENUM("Manhã", "Tarde"),
    allowNull: false,
  },
});

Child.hasMany(Tabelas_de_visita, {
  as: "Tabelas_de_visitas",
  foreignKey: "childId",
});
Tabelas_de_visita.belongsTo(Child, {
  as: "Child",
  foreignKey: "childId",
  onDelete: "SET NULL",
});
Caregiver.hasMany(Tabelas_de_visita, {
  as: "Tabelas_de_visitas_pregnant",
  foreignKey: "caregiverId",
});
Tabelas_de_visita.belongsTo(Caregiver, {
  as: "Caregivers",
  foreignKey: "caregiverId",
  onDelete: "SET NULL",
});

User.hasMany(Tabelas_de_visita, {
  as: "Tabelas_de_visitas",
  foreignKey: "visitadorId",
  scope: { role: "visitador" },
});
Tabelas_de_visita.belongsTo(User, {
  as: "visitador",
  foreignKey: "visitadorId",
  onDelete: "SET NULL",
});

module.exports = Tabelas_de_visita;
