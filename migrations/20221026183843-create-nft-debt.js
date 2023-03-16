'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('nft_debts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nft_debtAMMOUNT: {
        type: Sequelize.INTEGER
      },
      nftCONSECUTIVE: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('nft_debts');
  }
};