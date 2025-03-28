const { DataTypes, Model } = require("sequelize");
const db = require("../db/conn");

class Usuarios extends Model {}

Usuarios.init(
  {
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        len: {
          args: [3, 255],
          msg: "Nome deve ter entre 3 a 255 caracteres.",
        },
      },
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        len: {
          args: [3, 75],
          msg: "Senha deve ter entre 3 a 75 caracteres.",
        },
      },
    },
    role: {
      type: DataTypes.ENUM(
        "visitador",
        "supervisor",
        "coordenador",
        "rh",
        "root"
      ),
      allowNull: false,
    },
    cpf: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        len: { args: [11, 11], msg: "CPF tem que ter 11 digitos" },
      },
      unique: true,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
      unique: true,
    },
    territorio: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cras: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isPending: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    restrictionMakePlain: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    restrictLoginVisitPending: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    early_access: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    supervisorId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Users",
        key: "id",
      },
    },
    coordenadorId: {
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
    modelName: "Users",
  }
);

Usuarios.hasMany(Usuarios, {
  as: "supervisores",
  foreignKey: "supervisorId",
  sourceKey: "id",
});
Usuarios.hasMany(Usuarios, {
  as: "visitadores",
  foreignKey: "supervisorId",
  sourceKey: "id",
});

Usuarios.belongsTo(Usuarios, {
  as: "coordenador",
  foreignKey: "coordenadorId",
  onDelete: "SET NULL",
});
Usuarios.belongsTo(Usuarios, {
  as: "supervisor",
  foreignKey: "supervisorId",
  onDelete: "SET NULL",
});

module.exports = Usuarios;
