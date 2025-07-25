"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("VisitasPorGeolocalizacaos", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      latitude: {
        type: Sequelize.DOUBLE,
        allowNull: true,
      },
      longitude: {
        type: Sequelize.DOUBLE,
        allowNull: true,
      },
      hora_inicio: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      hora_fim: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      latitude_final: {
        type: Sequelize.DOUBLE,
        allowNull: true,
      },
      longitude_final: {
        type: Sequelize.DOUBLE,
        allowNull: true,
      },
      finalizou: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      visita_mentirosa: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      pendente_de_validacao: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      motivo_da_nao_realizacao: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      motivo_da_invalidacao: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      beneficiario_em_casa: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      latitude_beneficiario: {
        type: Sequelize.DOUBLE,
        allowNull: true,
      },
      longitude_beneficiario: {
        type: Sequelize.DOUBLE,
        allowNull: true,
      },
      data_que_vai_ser_realizada: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      visita_marcada_finalizada: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      visita_em_andamento: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      visitadorId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "Users",
          key: "id",
        },
      },
      childId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "Child",
          key: "id",
        },
      },
      planoId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "PlanosDeVisitas",
          key: "id",
        },
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("VisitasPorGeolocalizacao");
  },
};
