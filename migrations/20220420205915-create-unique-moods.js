'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('unique_moods', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      unique_moodTEXT: {
        allowNull: true,
        type: Sequelize.STRING
      },
      unique_moodCOLOR: {
        allowNull: true,
        type: Sequelize.STRING
      },
      unique_moodCODE: {
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
    await queryInterface.dropTable('unique_moods');
  }
};