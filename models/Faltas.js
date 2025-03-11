const db = require("../db/conn");
const { Model, DataTypes } = require("sequelize");
class Faltas extends Model {}

Faltas.init(
  {
    motivo_da_falta: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    falta_invalidada: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    pedir_para_invalidar_falta: {
      type: DataTypes.TEXT,
      validate: {
        len: [4, 400],
      },
      allowNull: true,
    },
    visitadorId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Users",
        key: "id",
      },
    },
    supervisorId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Users",
        key: "id",
      },
    },
  },
  {
    sequelize: db,
    modelName: "Faltas",
    tableName: "Faltas",
  }
);

module.exports = Faltas;
