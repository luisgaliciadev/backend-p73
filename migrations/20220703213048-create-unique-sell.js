'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('unique_sells', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      unique_sellQUANTITYSALE: {
        type: Sequelize.FLOAT
      },
      unique_sellTYPE: {
        type: Sequelize.ENUM("SALE","AUCTION"),
        defaultValue: "SALE",
      },
      unique_sellSTATUS: {
        type: Sequelize.ENUM("ACTIVE","INACTIVE"),
        defaultValue: "ACTIVE",
      },
      unique_sellPRICE: {
        type: Sequelize.FLOAT
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
      projectID: {
        type: Sequelize.INTEGER
      },
      projectCODE: {
        type: Sequelize.STRING
      },
      userID: {
        type:Sequelize.INTEGER
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
    await queryInterface.dropTable('unique_sells');
  }
};