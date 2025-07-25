'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("PlanosDeVisitas", "visitadorId", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "Users",
        key: 'id'
      }
    })

    await queryInterface.addColumn("PlanosDeVisitas", "childId", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "Child",
        key: 'id'
      }
    })
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.removeColumn("PlanosDeVisitas", "visitadorId");
    await queryInterface.removeColumn("PlanosDeVisitas", "childId");
  }

};
