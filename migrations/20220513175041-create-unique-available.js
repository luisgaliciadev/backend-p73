'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('unique_availables', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      unique_availableQUANTITY: {
        type: Sequelize.INTEGER
      },
      unique_availableDATEUNTIL: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable('UniqueAvailables');
  }
};