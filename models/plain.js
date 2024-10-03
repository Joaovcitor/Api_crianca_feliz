const { DataTypes } = require("sequelize");
const db = require("../db/conn");
const Child = require("./Child");
const User = require("./Users");

const PlanoDeVisita = db.define(
  "PlanosDeVisitas",
  {
    objetivo: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    etapa1: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    etapa2: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    etapa3: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    observacao: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    dia_de_visita_realizado: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    dia_a_ser_realizada_a_visita: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    grau_de_dificuldade_objetivo: {
      type: DataTypes.ENUM("Fácil", "Média", "Dificil"),
      allowNull: false,
    },
    conseguiu_fazer: {
      type: DataTypes.ENUM("Com ajuda", "Sem ajuda", "Não quis fazer"),
      allowNull: true,
    },
    fez_com_dificuldade: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
  }
);

Child.hasMany(PlanoDeVisita, {
  as: "PlanoDeVisitas",
  foreignKey: "childId",
});
PlanoDeVisita.belongsTo(Child, {
  as: "Child",
  foreignKey: "childId",
  onDelete: 'SET NULL'
});

User.hasMany(PlanoDeVisita, {
  as: "PlanoDeVisitas",
  foreignKey: "visitadorId",
  scope: { role: "visitador" },
});
PlanoDeVisita.belongsTo(User, {
  as: "visitador",
  foreignKey: "visitadorId",
  onDelete: 'SET NULL'
});

module.exports = PlanoDeVisita;
