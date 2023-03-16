'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('report_problems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      report: {
        type: Sequelize.STRING
      },
      reportTOPIC: {
        type: Sequelize.ENUM("OTHER","UNIQUE","ARTWORK","STORY","PROFILE"),
        defaultValue: "OTHER"
      },
      status: {
        type: Sequelize.ENUM("RECEIVED","REVIEW","CLOSED"),
        defaultValue: "RECEIVED"
      },
      userID: {
        type: Sequelize.INTEGER
      },
      elementID: {
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
    await queryInterface.dropTable('report_problems');
  }
};