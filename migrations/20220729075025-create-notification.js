'use strict';

const { sequelize } = require("../models");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('notifications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      notificationTITLE: {
        type: Sequelize.STRING
      },
      USERTO: {
        type: Sequelize.INTEGER
      },
      USERFROM: {
        type: Sequelize.INTEGER
      },
      notificationMESSAGE: {
        type: Sequelize.STRING
      },
      notificationMESSAGETWO: {
        type: Sequelize.STRING
      },
      notificationLOOP: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      notificationVIEW: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      notificationNUMBERREPET: {
        type: Sequelize.INTEGER,
      },
      notificationIMG: {
        type: Sequelize.STRING
      },
      notificationIMGTWO: {
        type: Sequelize.STRING
      },
      modelID: {
        type: Sequelize.INTEGER
      },
      modelTYPE: {
        type: Sequelize.STRING
      },
      notificationTYPE: {
        type: Sequelize.ENUM("ESSENTIAL","PROMOTIONAL","FINANCIAL","SOCIAL")
      },
      notificationSITUATIONAUCTION: {
        type: Sequelize.ENUM("NONE","FAIL","SUCCESS","WAITING","NO-MET"),
        defaultValue: "NONE"
      },
      notificationSELLTYPE: {
        type: Sequelize.ENUM("NONE","SELL","AUCTION"),
        defaultValue: "NONE"
      },
      notificationTYPEUSER:{ 
        type: Sequelize.ENUM("SELL","BUY"),
      },
      notificationCOLORTITLE: {
        type: Sequelize.STRING
      },
      notificationCOLORMESSAGE: {
        type: Sequelize.STRING
      },
      notificationCOLORMESSAGETWO: {
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
    await queryInterface.dropTable('notifications');
  }
};