'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("PlanosDeVisitas", "createdAt", {
      allowNull: false,
      type: Sequelize.DATE
    })

    await queryInterface.addColumn("PlanosDeVisitas", "updatedAt", {
      allowNull: false,
      type: Sequelize.DATE
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("PlanosDeVisitas", "createdAt")
    await queryInterface.removeColumn("PlanosDeVisitas", "updatedAt")

  }
};
