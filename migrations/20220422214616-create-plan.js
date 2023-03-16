'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('plans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      planTITLE: {
        type: Sequelize.STRING
      },
      planCODE: {
        type: Sequelize.STRING
      },
      planCOLOR: {
        type: Sequelize.STRING
      },
      planFULLPRICE: {
        type: Sequelize.STRING
      },
      planDISCOUNTPRICE: {
        type: Sequelize.STRING
      },
      planQUANTITYPROMTP: {
        type: Sequelize.STRING
      },
      languageID: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('plans');
  }
};