"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("form7-Etapa1s", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      q1: {
        type: Sequelize.ENUM(
          "Consegue fazer sozinho",
          "Consegue fazer com Ajuda",
          "Ainda não consegue fazer"
        ),
        allowNull: false,
      },
      q2: {
        type: Sequelize.ENUM(
          "Consegue fazer sozinho",
          "Consegue fazer com Ajuda",
          "Ainda não consegue fazer"
        ),
        allowNull: false,
      },
      q3: {
        type: Sequelize.ENUM(
          "Consegue fazer sozinho",
          "Consegue fazer com Ajuda",
          "Ainda não consegue fazer"
        ),
        allowNull: false,
      },
      q4: {
        type: Sequelize.ENUM(
          "Consegue fazer sozinho",
          "Consegue fazer com Ajuda",
          "Ainda não consegue fazer"
        ),
        allowNull: false,
      },
      q5: {
        type: Sequelize.ENUM(
          "Consegue fazer sozinho",
          "Consegue fazer com Ajuda",
          "Ainda não consegue fazer"
        ),
        allowNull: false,
      },
      q6: {
        type: Sequelize.ENUM(
          "Consegue fazer sozinho",
          "Consegue fazer com Ajuda",
          "Ainda não consegue fazer"
        ),
        allowNull: false,
      },
      q7: {
        type: Sequelize.ENUM(
          "Consegue fazer sozinho",
          "Consegue fazer com Ajuda",
          "Ainda não consegue fazer"
        ),
        allowNull: false,
      },
      q8: {
        type: Sequelize.ENUM(
          "Consegue fazer sozinho",
          "Consegue fazer com Ajuda",
          "Ainda não consegue fazer"
        ),
        allowNull: false,
      },
      q9: {
        type: Sequelize.ENUM(
          "Consegue fazer sozinho",
          "Consegue fazer com Ajuda",
          "Ainda não consegue fazer"
        ),
        allowNull: false,
      },
      q10: {
        type: Sequelize.ENUM(
          "Consegue fazer sozinho",
          "Consegue fazer com Ajuda",
          "Ainda não consegue fazer"
        ),
        allowNull: false,
      },
      childId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Children",
          key: "id",
        },
      },
      visitadorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
