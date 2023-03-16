'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('voucher_uuids', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      voucher_uuidCODE: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('voucher_uuids');
  }
};