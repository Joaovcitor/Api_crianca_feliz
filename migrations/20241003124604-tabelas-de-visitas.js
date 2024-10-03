'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("TabelasDeVisitas", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      dateOfvisit: {
        type: Sequelize.DATE,
        allowNull: true
      },
      childVisited: {
        type: Sequelize.STRING,
        allowNull: false
      },
      dayOfVisit: {
        type: Sequelize.ENUM("Segunda", "Terça", "Quarta", "Quinta", "Sexta"),
        allowNull: false
      },
      period: {
        type: Sequelize.ENUM("Manhã", "Tarde"),
        allowNull: false,
      },
      visitadorId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "Users",
          key: 'id'
        }
      },
      childId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "Child",
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
    })
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
