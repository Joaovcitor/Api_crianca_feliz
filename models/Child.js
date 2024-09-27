const { DataTypes } = require("sequelize");
const db = require("../db/conn");
const Caregiver = require("./Caregiver");
const User = require("./Users");

const Child = db.define("Child", {
  nis: {
    type: DataTypes.STRING,
    required: false,
  },
  name: {
    type: DataTypes.STRING,
    required: true,
  },
  born: {
    type: DataTypes.DATE,
    required: true,
  },
  sexo: {
    type: DataTypes.ENUM("Masculino", "Feminino"),
    required: true,
  },
  isPending: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  isBpc: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

Caregiver.hasMany(Child, {
  as: "Children",
  foreignKey: "caregiverId",
});
Child.belongsTo(Caregiver, { as: "Caregiver", foreignKey: "caregiverId", onDelete: 'SET NULL' });

User.hasMany(Child, {
  as: "Children",
  foreignKey: "visitadorId",
  scope: { role: "visitador" },
});
Child.belongsTo(User, { as: "visitador", foreignKey: "visitadorId", onDelete: 'SET NULL' });

module.exports = Child;
