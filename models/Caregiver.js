const { DataTypes } = require("sequelize");
const db = require("../db/conn");
const User = require("./Users");

const Caregiver = db.define("Caregiver", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cpf: {
    type: DataTypes.STRING,
    required: true,
  },
  rg: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  address: {
    type: DataTypes.STRING,
    required: true,
  },
  district: {
    type: DataTypes.STRING,
    required: true,
  },
  contact: {
    type: DataTypes.STRING,
    required: true,
  },
  born: {
    type: DataTypes.DATE,
    required: false,
  },
  pregnant: {
    type: DataTypes.BOOLEAN,
  },
  isPending: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  week_pregnant: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0
  },
});

User.hasMany(Caregiver, {
  as: "Caregivers",
  foreignKey: "visitadorId",
  scope: { role: "visitador" },
});
Caregiver.belongsTo(User, { as: "visitador", foreignKey: "visitadorId", onDelete: 'SET NULL' });

module.exports = Caregiver;
