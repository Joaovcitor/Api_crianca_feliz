"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Faltas", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      motivo_da_falta: {
        type: Sequelize.TEXT,
        validate: {
          len: [4, 400],
        },
        allowNull: false,
      },
      quando_ocorreu_a_falta: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      falta_invalidada: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      pedir_para_invalidar_falta: {
        type: Sequelize.TEXT,
        allowNull: true,
        validate: {
          len: [4, 400],
        },
      },
      visitadorId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "Users",
          key: "id",
        },
      },
      supervisorId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "Users",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
