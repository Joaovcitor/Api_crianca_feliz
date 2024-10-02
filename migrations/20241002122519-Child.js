'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Child", {
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
      nis: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      born: {
        type: Sequelize.DATE,
        required: false,
      },
      visitadorId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "Users",
          key: 'id'
        }
      },
      caregiverId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "Caregivers",
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
    await queryInterface.dropTable("Child")
  }
};
