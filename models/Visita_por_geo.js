const { DataTypes } = require("sequelize");
const db = require("../db/conn");
const User = require("./Users");
const Child = require("./Child");
const PlanosDeVisita = require("./plain")

const Visita = db.define("VisitasPorGeolocalizacao", {
  latitude: {
    type: DataTypes.DOUBLE,
    allowNull: true,
  },
  longitude: {
    type: DataTypes.DOUBLE,
    allowNull: true,
  },
  hora_inicio: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  hora_fim: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  latitude_final: {
    type: DataTypes.DOUBLE,
    allowNull: true,
  },
  longitude_final: {
    type: DataTypes.DOUBLE,
    allowNull: true,
  },
  finalizou: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  visita_mentirosa: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  pendente_de_validacao: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  motivo_da_nao_realizacao: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  motivo_da_invalidacao: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  beneficiario_em_casa: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  latitude_beneficiario: {
    type: DataTypes.DOUBLE,
    allowNull: true,
  },
  longitude_beneficiario: {
    type: DataTypes.DOUBLE,
    allowNull: true,
  },
  data_que_vai_ser_realizada: {
    type: DataTypes.DATE,
    allowNull: false
  },
  visita_marcada_finalizada: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  visita_em_andamento: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

Child.hasMany(Visita, {
  as: "Visitas",
  foreignKey: "childId",
});
Visita.belongsTo(Child, {
  as: "Child",
  foreignKey: "childId",
  onDelete: 'SET NULL'
});

User.hasMany(Visita, {
  as: "Visitas",
  foreignKey: "visitadorId",
  scope: { role: "visitador" },
});
Visita.belongsTo(User, {
  as: "visitador",
  foreignKey: "visitadorId",
  onDelete: 'SET NULL'
});

PlanosDeVisita.hasMany(Visita, {
  as: "Visitas",
  foreignKey: "planoId"
});

Visita.belongsTo(PlanosDeVisita, {
  as: "planos",
  foreignKey: "planoId",
  onDelete: 'SET NULL'
})

module.exports = Visita;
