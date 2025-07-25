'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.addColumn("Child", "isPending", {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    })

    await queryInterface.addColumn("Child", "sexo", {
      type: Sequelize.ENUM("Masculino", "Feminino"),
      required: true,
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Child", "isPending")
    await queryInterface.removeColumn("Child", "sexo")
  }
};
