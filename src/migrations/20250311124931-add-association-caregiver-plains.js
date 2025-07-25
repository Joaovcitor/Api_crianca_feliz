"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("PlanosDeVisitas", "CaregiverId", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        key: "id",
        model: "Caregivers",
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
