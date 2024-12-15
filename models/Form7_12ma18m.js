const { DataTypes } = require("sequelize");
const db = require("../db/conn");
const Child = require("./Child");
const User = require("./Users");

const Etapa5F7 = db.define("form7-Etapa5s", {
  q1: {
    type: DataTypes.ENUM,
    values: [
      "Consegue fazer sozinho",
      "Consegue fazer com Ajuda",
      "Ainda não consegue fazer",
    ],
    allowNull: false,
  },
  q2: {
    type: DataTypes.ENUM,
    values: [
      "Consegue fazer sozinho",
      "Consegue fazer com Ajuda",
      "Ainda não consegue fazer",
    ],
    allowNull: false,
  },
  q3: {
    type: DataTypes.ENUM,
    values: [
      "Consegue fazer sozinho",
      "Consegue fazer com Ajuda",
      "Ainda não consegue fazer",
    ],
    allowNull: false,
  },
  q4: {
    type: DataTypes.ENUM,
    values: [
      "Consegue fazer sozinho",
      "Consegue fazer com Ajuda",
      "Ainda não consegue fazer",
    ],
    allowNull: false,
  },
  q5: {
    type: DataTypes.ENUM,
    values: [
      "Consegue fazer sozinho",
      "Consegue fazer com Ajuda",
      "Ainda não consegue fazer",
    ],
    allowNull: false,
  },
  q6: {
    type: DataTypes.ENUM,
    values: [
      "Consegue fazer sozinho",
      "Consegue fazer com Ajuda",
      "Ainda não consegue fazer",
    ],
    allowNull: false,
  },
});

Child.hasMany(Etapa5F7, {
  as: "Etapa5F7s",
  foreignKey: "childId",
});
Etapa5F7.belongsTo(Child, {
  as: "Child",
  foreignKey: "childId",
  onDelete: "SET NULL",
});

User.hasMany(Etapa5F7, {
  as: "Etapa5F7s",
  foreignKey: "visitadorId",
  scope: { role: "visitador" },
});
Etapa5F7.belongsTo(User, {
  as: "visitador",
  foreignKey: "visitadorId",
  onDelete: "SET NULL",
});

module.exports = Etapa5F7;
