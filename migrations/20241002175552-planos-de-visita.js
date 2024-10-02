'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("PlanosDeVisitas", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      objetivo: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      etapa1: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      etapa2: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      etapa3: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      observacao: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      dia_de_visita_realizado: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      dia_a_ser_realizada_a_visita: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      grau_de_dificuldade_objetivo: {
        type: Sequelize.ENUM("Fácil", "Média", "Dificil"),
        allowNull: false,
      },
      conseguiu_fazer: {
        type: Sequelize.ENUM("Com ajuda", "Sem ajuda", "Não quis fazer"),
        allowNull: true,
      },
      fez_com_dificuldade: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("PlanosDeVisitas")
  }
};
