'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('promtp_availables', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      promtp_availableQUANTITY: {
        type: Sequelize.INTEGER
      },
      promtp_availableUNTIL: {
        type: Sequelize.DATE
      },
      userID: {
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
    await queryInterface.dropTable('PromtpAvailables');
  }
};