"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("VisitasPorGeolocalizacaos", "createdAt", {
      allowNull: false,
      type: Sequelize.DATE,
    });

    await queryInterface.addColumn("VisitasPorGeolocalizacaos", "updatedAt", {
      allowNull: false,
      type: Sequelize.DATE,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("VisitasPorGeolocalizacaos", "createdAt");
    await queryInterface.removeColumn("VisitasPorGeolocalizacaos", "updatedAt");
  },
};
