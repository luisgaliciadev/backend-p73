'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('subscription_notifications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      subscriptionENDPOINT: {
        type: Sequelize.STRING
      },
      subscriptionKEY: {
        type: Sequelize.STRING
      },
      subscriptionAUTH: {
        type: Sequelize.STRING
      },
      userID: {
        type: Sequelize.STRING,
      },
      subscriptionAPP: {
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
    await queryInterface.dropTable('subscription_notifications');
  }
};