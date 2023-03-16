'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      transactionCODE: {
        type: Sequelize.STRING
      },
      transactionAMOUNT: {
        type: Sequelize.FLOAT
      },
      userTO: {
        type: Sequelize.INTEGER
      },
      userFROM: {
        type: Sequelize.INTEGER
      },
      uniqueID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'uniques',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      unique_sellID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'unique_sells',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      promtpID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'promtps',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      transactionAMOUNTTOKEN: {
        type: Sequelize.INTEGER
      },
      voucherID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'vouchers',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      transactionOBSERVATION: {
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
    await queryInterface.dropTable('transactions');
  }
};