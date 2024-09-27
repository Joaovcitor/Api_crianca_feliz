const { DataTypes } = require('sequelize');
const db = require('../db/conn');
const Child = require('./Child');
const User = require('./Users');

const Etapa7f7 = db.define("Etapa7f7", {
  q1: {
    type: DataTypes.ENUM,
    values: ['Consegue fazer sozinho', 'Consegue fazer com Ajuda', 'Ainda não consegue fazer'],
    allowNull: false
  },
  q2: {
    type: DataTypes.ENUM,
    values: ['Consegue fazer sozinho', 'Consegue fazer com Ajuda', 'Ainda não consegue fazer'],
    allowNull: false
  },
  q3: {
    type: DataTypes.ENUM,
    values: ['Consegue fazer sozinho', 'Consegue fazer com Ajuda', 'Ainda não consegue fazer'],
    allowNull: false
  },
  q4: {
    type: DataTypes.ENUM,
    values: ['Consegue fazer sozinho', 'Consegue fazer com Ajuda', 'Ainda não consegue fazer'],
    allowNull: false
  },
  q5: {
    type: DataTypes.ENUM,
    values: ['Consegue fazer sozinho', 'Consegue fazer com Ajuda', 'Ainda não consegue fazer'],
    allowNull: false
  },
  q6: {
    type: DataTypes.ENUM,
    values: ['Consegue fazer sozinho', 'Consegue fazer com Ajuda', 'Ainda não consegue fazer'],
    allowNull: false
  },
  q7: {
    type: DataTypes.ENUM,
    values: ['Consegue fazer sozinho', 'Consegue fazer com Ajuda', 'Ainda não consegue fazer'],
    allowNull: false
  },
  q8: {
    type: DataTypes.ENUM,
    values: ['Consegue fazer sozinho', 'Consegue fazer com Ajuda', 'Ainda não consegue fazer'],
    allowNull: false
  },
  q9: {
    type: DataTypes.ENUM,
    values: ['Consegue fazer sozinho', 'Consegue fazer com Ajuda', 'Ainda não consegue fazer'],
    allowNull: false
  },
});

Child.hasMany(Etapa7f7, {
  as: "Etapa7f7s",
  foreignKey: "childId",
});
Etapa7f7.belongsTo(Child, {
  as: "Child",
  foreignKey: "childId",
  onDelete: 'SET NULL'
});


User.hasMany(Etapa7f7, {
  as: "Etapa7f7s", 
  foreignKey: "visitadorId",
  scope: { role: "visitador" },
});
Etapa7f7.belongsTo(User, {
  as: "visitador",
  foreignKey: "visitadorId",
  onDelete: 'SET NULL'
});

module.exports = Etapa7f7;
