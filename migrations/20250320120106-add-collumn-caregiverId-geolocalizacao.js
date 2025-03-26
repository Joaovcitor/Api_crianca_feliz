"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("VisitasPorGeolocalizacaos", "caregiverId", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "Caregivers",
        key: "id",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      "VisitasPorGeolocalizacaos",
      "caregiverId"
    );
  },
};
