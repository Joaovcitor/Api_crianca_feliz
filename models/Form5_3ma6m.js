const { DataTypes } = require('sequelize');
const db = require('../db/conn');
const Child = require('./Child');
const User = require('./Users');

const Etapa2 = db.define("Etapa2", {
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

Child.hasMany(Etapa2, {
  as: "Etapa2s",
  foreignKey: "childId",
});
Etapa2.belongsTo(Child, {
  as: "Child",
  foreignKey: "childId",
  onDelete: 'SET NULL'
});


User.hasMany(Etapa2, {
  as: "Etapa2s", 
  foreignKey: "visitadorId",
  scope: { role: "visitador" },
});
Etapa2.belongsTo(User, {
  as: "visitador",
  foreignKey: "visitadorId",
  onDelete: 'SET NULL'
});

module.exports = Etapa2;
