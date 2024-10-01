'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          notEmpty: true,
          len: {
            args: [3, 255],
            msg: "Nome deve ter entre 3 a 255 caracteres."
          }
        }
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          notEmpty: true,
          len: {
            args: [3, 75],
            msg: "Senha deve ter entre 3 a 75 caracteres."
          }
        }
      },
      role: {
        type: Sequelize.ENUM("visitador", "supervisor", "coordenador"),
        allowNull: false,
      },
      cpf: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          notEmpty: true,
          len: { args: [11, 11], msg: "CPF tem que ter 11 dígitos" }
        },
        unique: true
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          isEmail: true,
        },
        unique: true
      },
      territorio: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cras: {
        type: Sequelize.STRING,
        allowNull: true
      },
      isPending: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      restrictionMakePlain: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      restrictLoginVisitPending: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      early_access: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      supervisorId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "Users", // Alterar para o nome da tabela
          key: 'id'
        }
      },
      coordenadorId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "Users", // Alterar para o nome da tabela
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  }
};
