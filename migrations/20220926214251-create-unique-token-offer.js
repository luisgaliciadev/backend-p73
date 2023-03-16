'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('unique_token_offers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      unique_token_offerAMMOUNT: {
        type: Sequelize.FLOAT
      },
      unique_token_offerDATEEND: {
        type: Sequelize.DATE
      },
      unique_token_offerSTATUS: {
        type: Sequelize.ENUM("SUCCESS","PENDING","FAILED","REFUSED"),
        defaultValue: "PENDING"
      },
      unique_token_offerTRANSACTIONCODE: {
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
      unique_token_offerQUANTITYTOKEN: {
        type: Sequelize.INTEGER
      },
      userOWNER: {
        type: Sequelize.INTEGER
      },
      userBUY: {
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
    await queryInterface.dropTable('unique_token_offers');
  }
};