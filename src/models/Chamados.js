const { Model, DataTypes } = require("sequelize");
const Users = require("./Users");

class Chamados extends Model {}

Chamados.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  tipo_do_chamado: {
    type: DataTypes.ENUM("bug", "duvida", "edicao", "outros"),
    allowNull: false,
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: { len: [4, 600] },
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Users",
      key: "id",
    },
  },
  userIdDestinatario: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: "Users",
      key: "id",
    },
  },
});

Users.hasMany(Chamados, {
  as: "Chamados",
  foreignKey: "userId",
  onDelete: "CASCADE",
});

Chamados.belongsTo(Users, {
  as: "Criador",
  foreignKey: "userId",
  onDelete: "SET NULL",
});

Users.hasMany(Chamados, {
  as: "Chamados",
  foreignKey: "userId",
  onDelete: "CASCADE",
});

Chamados.belongsTo(Users, {
  as: "Destinatarios",
  foreignKey: "userId",
  onDelete: "SET NULL",
});

module.exports = Chamados;
