const db = require("../db/conn");
const { DataTypes } = require("sequelize");

const Falta = db.define("Falta", {
  motivo_da_falta: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  invalidar_falta: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Falta;
