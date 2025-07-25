const { Model, DataTypes } = require("sequelize");
const db = require("../db/conn");
const Caregiver = require("./Caregiver");
const User = require("./Users");

class Child extends Model {}

Child.init(
  {
    nis: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    born: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    sexo: {
      type: DataTypes.ENUM("Masculino", "Feminino"),
      allowNull: false,
    },
    isPending: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    isBpc: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize: db,
    modelName: "Child",
    tableName: "Child", // Mantém o nome correto da tabela do banco
  }
);

// Definição dos relacionamentos
Caregiver.hasMany(Child, {
  as: "children",
  foreignKey: "caregiverId",
});
Child.belongsTo(Caregiver, {
  as: "caregiver",
  foreignKey: "caregiverId",
  onDelete: "SET NULL",
});

User.hasMany(Child, {
  as: "children",
  foreignKey: "visitadorId",
  scope: { role: "visitador" },
});
Child.belongsTo(User, {
  as: "visitador",
  foreignKey: "visitadorId",
  onDelete: "SET NULL",
});

module.exports = Child;
