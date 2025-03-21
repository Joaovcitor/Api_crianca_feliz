const { Model, DataTypes, Sequelize } = require("sequelize");
const db = require("../db/conn");
const Child = require("./Child");
const User = require("./Users");
class Etapa5 extends Model { }

Etapa5.init(
  {
    q1: {
      type: DataTypes.ENUM(
        "Consegue fazer sozinho",
        "Consegue fazer com Ajuda",
        "Ainda não consegue fazer"
      ),
      allowNull: false,
    },
    q2: {
      type: DataTypes.ENUM(
        "Consegue fazer sozinho",
        "Consegue fazer com Ajuda",
        "Ainda não consegue fazer"
      ),
      allowNull: false,
    },
    q3: {
      type: DataTypes.ENUM(
        "Consegue fazer sozinho",
        "Consegue fazer com Ajuda",
        "Ainda não consegue fazer"
      ),
      allowNull: false,
    },
    q4: {
      type: DataTypes.ENUM(
        "Consegue fazer sozinho",
        "Consegue fazer com Ajuda",
        "Ainda não consegue fazer"
      ),
      allowNull: false,
    },
    q5: {
      type: DataTypes.ENUM(
        "Consegue fazer sozinho",
        "Consegue fazer com Ajuda",
        "Ainda não consegue fazer"
      ),
      allowNull: false,
    },
    q6: {
      type: DataTypes.ENUM(
        "Consegue fazer sozinho",
        "Consegue fazer com Ajuda",
        "Ainda não consegue fazer"
      ),
      allowNull: false,
    },
    childId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Child",
        key: "id"
      }
    },
    visitadorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id"
      }
    }
  },
  {
    sequelize: db,
    modelName: "Etapa5"
  }
)

Child.hasMany(Etapa5, {
  as: "Etapa5s",
  foreignKey: "childId",
});
Etapa5.belongsTo(Child, {
  as: "Child",
  foreignKey: "childId",
  onDelete: 'SET NULL'
});


User.hasMany(Etapa5, {
  as: "Etapa5s",
  foreignKey: "visitadorId",
  scope: { role: "visitador" },
});
Etapa5.belongsTo(User, {
  as: "visitador",
  foreignKey: "visitadorId",
  onDelete: 'SET NULL'
});

module.exports = Etapa5;
