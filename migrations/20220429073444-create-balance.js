'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('balances', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      balanceAmount: {
        type: Sequelize.DECIMAL(10,4)
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
    await queryInterface.dropTable('balances');
  }
};