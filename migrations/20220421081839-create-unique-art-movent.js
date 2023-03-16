'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('unique_art_movents', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      unique_art_moventTEXT: {
        allowNull: true,
        type: Sequelize.STRING
      },
      unique_art_moventtCOLOR: {
        allowNull: true,
        type: Sequelize.STRING
      },
      unique_art_moventCODE: {
        allowNull: true,
        type: Sequelize.STRING
      },
      unique_art_moventIMAGE: {
        allowNull: true,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('unique_art_movents');
  }
};