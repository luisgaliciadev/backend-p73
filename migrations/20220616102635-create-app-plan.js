'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('app_plans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name : {
        type: Sequelize.STRING
      },
      basic: {
        type: Sequelize.INTEGER
      },
      modeBasic: {
        type: Sequelize.ENUM("DAY", "MONTH")
      },
      tokens: {
        type: Sequelize.INTEGER
      },
      artworks: {
        type: Sequelize.INTEGER
      },
      modeArtworks: {
        type: Sequelize.ENUM("DAY", "MONTH")
      },
      drafts: {
        type: Sequelize.INTEGER
      },
      uniques: {
        type: Sequelize.INTEGER
      },
      discount: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      price: {
        type: Sequelize.FLOAT
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('app_plans');
  }
};