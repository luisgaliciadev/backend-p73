'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('movements', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      movementAmount: {
        type: Sequelize.DECIMAL(10,4)
      },
      balanceID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'balances',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      movementTYPE: {
        type: Sequelize.ENUM('RECHARGE','WITHDRAWAL')
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
    await queryInterface.dropTable('movements');
  }
};