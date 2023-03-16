'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('profile_investors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      profile_investorIMG: {
        type: Sequelize.STRING
      },
      profile_investorDESCRIPTION: {
        type: Sequelize.TEXT
      },
      userID: {
        type: Sequelize.INTEGER.UNSIGNED
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
    await queryInterface.dropTable('profile_investors');
  }
};