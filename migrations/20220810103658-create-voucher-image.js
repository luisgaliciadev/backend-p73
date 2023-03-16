'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('voucher_images', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
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
      voucher_imageLINK: {
        type: Sequelize.TEXT
      },
      voucher_imageVIEW: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
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
    await queryInterface.dropTable('voucher_images');
  }
};