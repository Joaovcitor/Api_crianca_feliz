'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Caregivers", {
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
      cpf: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          notEmpty: true,
          len: { args: [11, 11], msg: "CPF tem que ter 11 dígitos" }
        },
        unique: true
      },

      rg: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      address: {
        type: Sequelize.STRING,
        required: true,
      },
      district: {
        type: Sequelize.STRING,
        required: true,
      },
      contact: {
        type: Sequelize.STRING,
        required: true,
      },
      born: {
        type: Sequelize.DATE,
        required: false,
      },
      pregnant: {
        type: Sequelize.BOOLEAN,
      },
      isPending: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      supervisorId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "Users",
          key: 'id'
        }
      },
      visitadorId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "Users",
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
    await queryInterface.dropTable("Caregivers");
  }
};
