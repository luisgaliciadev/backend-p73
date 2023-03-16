'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('auction_offers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      auction_offerAMMOUNT: {
        type: Sequelize.FLOAT
      },
      auction_offerDATE: {
        type: Sequelize.DATE
      },
      userID: {
        type: Sequelize.INTEGER
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
      auction_offerSTATUS: {
        type: Sequelize.ENUM("ACTIVE","FAILED","APPROVED","REJECTED"),
      defaultValue: "ACTIVE",
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
    await queryInterface.dropTable('auction_offers');
  }
};