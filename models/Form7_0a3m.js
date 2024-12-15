const { DataTypes } = require("sequelize");
const db = require("../db/conn");
const Child = require("./Child");
const User = require("./Users");

const Etapa1f7 = db.define(
  "form7-Etapa1s",
  {
    q1: {
      type: DataTypes.ENUM(
        "Consegue fazer sozinho",
        "Consegue fazer com Ajuda",
        "Ainda não consegue fazer"
      ),
      allowNull: false,
    },
    q2: {
      type: DataTypes.ENUM(
        "Consegue fazer sozinho",
        "Consegue fazer com Ajuda",
        "Ainda não consegue fazer"
      ),
      allowNull: false,
    },
    q3: {
      type: DataTypes.ENUM(
        "Consegue fazer sozinho",
        "Consegue fazer com Ajuda",
        "Ainda não consegue fazer"
      ),
      allowNull: false,
    },
    q4: {
      type: DataTypes.ENUM(
        "Consegue fazer sozinho",
        "Consegue fazer com Ajuda",
        "Ainda não consegue fazer"
      ),
      allowNull: false,
    },
    q5: {
      type: DataTypes.ENUM(
        "Consegue fazer sozinho",
        "Consegue fazer com Ajuda",
        "Ainda não consegue fazer"
      ),
      allowNull: false,
    },
    q6: {
      type: DataTypes.ENUM(
        "Consegue fazer sozinho",
        "Consegue fazer com Ajuda",
        "Ainda não consegue fazer"
      ),
      allowNull: false,
    },
    q7: {
      type: DataTypes.ENUM(
        "Consegue fazer sozinho",
        "Consegue fazer com Ajuda",
        "Ainda não consegue fazer"
      ),
      allowNull: false,
    },
    q8: {
      type: DataTypes.ENUM(
        "Consegue fazer sozinho",
        "Consegue fazer com Ajuda",
        "Ainda não consegue fazer"
      ),
      allowNull: false,
    },
    q9: {
      type: DataTypes.ENUM(
        "Consegue fazer sozinho",
        "Consegue fazer com Ajuda",
        "Ainda não consegue fazer"
      ),
      allowNull: false,
    },
    q10: {
      type: DataTypes.ENUM(
        "Consegue fazer sozinho",
        "Consegue fazer com Ajuda",
        "Ainda não consegue fazer"
      ),
      allowNull: false,
    },
    q11: {
      type: DataTypes.ENUM(
        "Consegue fazer sozinho",
        "Consegue fazer com Ajuda",
        "Ainda não consegue fazer"
      ),
      allowNull: false,
    },
  },
  { tableName: "Etapa1f7" }
);

Child.hasMany(Etapa1f7, {
  as: "Etapa1f7s",
  foreignKey: "childId",
});
Etapa1f7.belongsTo(Child, {
  as: "Child",
  foreignKey: "childId",
  onDelete: "SET NULL",
});

User.hasMany(Etapa1f7, {
  as: "Etapa1f7s",
  foreignKey: "visitadorId",
  scope: { role: "visitador" },
});
Etapa1f7.belongsTo(User, {
  as: "visitador",
  foreignKey: "visitadorId",
  onDelete: "SET NULL",
});

module.exports = Etapa1f7;
