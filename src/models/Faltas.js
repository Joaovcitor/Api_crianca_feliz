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
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Users",
        key: "id",
      },
    },
    registradorId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Users",
        key: "id",
      },
    },
    quando_ocorreu_a_falta: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    pedido_para_invalidar_aceito: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    motivo_falta_justificada: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        len: [4, 400],
      },
    },
    falta_justificada: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize: db,
    modelName: "Faltas",
    tableName: "Faltas",
  }
);

module.exports = Faltas;
