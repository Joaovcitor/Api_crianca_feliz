"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Faltas", "pedido_para_invalidar_aceito", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
    await queryInterface.addColumn("Faltas", "motivo_falta_justificada", {
      type: Sequelize.TEXT,
      allowNull: true,
      validate: {
        len: [4, 400],
      },
    });
    await queryInterface.addColumn("Faltas", "falta_justificada", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Faltas", "pedido_para_invalidar_aceito");
    await queryInterface.removeColumn("Faltas", "motivo_falta_justificada");
    await queryInterface.removeColumn("Faltas", "falta_justificada");
  },
};
