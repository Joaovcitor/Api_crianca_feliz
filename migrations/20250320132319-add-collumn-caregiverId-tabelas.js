"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("TabelasDeVisitas", "caregiverId", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "Caregivers",
        key: "id",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("TabelasDeVisitas", "caregiverId");
  },
};
