'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('vouchers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      voucherTITLE: {
        type: Sequelize.STRING
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
      userID: {
        type: Sequelize.INTEGER
      },
      voucherPRICE: {
        type: Sequelize.FLOAT
      },
      voucherQR: {
        type: Sequelize.STRING
      },
      voucherIMG: {
        type: Sequelize.STRING
      },
      voucherDESCRIPTION: {
        type: Sequelize.TEXT
      },
      voucherDATESTART: {
        type: Sequelize.DATE
      },
      voucherDATEENDING: {
        type: Sequelize.DATE
      },
      voucherCOLLETIONMETHOD: {
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
    await queryInterface.dropTable('vouchers');
  }
};