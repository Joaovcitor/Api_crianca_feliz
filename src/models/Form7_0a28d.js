const { DataTypes } = require('sequelize');
const db = require('../db/conn');
const Child = require('./Child');
const User = require('./Users');

const Form7_0a28d = db.define("Form7_0a28d", {
  q1: {
    type: DataTypes.ENUM,
    values: ['presente', 'ausente'],
    allowNull: false
  },
  q2: {
    type: DataTypes.ENUM,
    values: ['presente', 'ausente'],
    allowNull: false
  }
});

Child.hasMany(Form7_0a28d, {
  as: "Form7_0a28ds",
  foreignKey: "childId",
});
Form7_0a28d.belongsTo(Child, {
  as: "Child",
  foreignKey: "childId",
  onDelete: 'SET NULL'
});


User.hasMany(Form7_0a28d, {
  as: "Form7_0a28ds", 
  foreignKey: "visitadorId",
  scope: { role: "visitador" },
});
Form7_0a28d.belongsTo(User, {
  as: "visitador",
  foreignKey: "visitadorId",
  onDelete: 'SET NULL'
});

module.exports = Form7_0a28d;
