'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('uniques', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uniquePROMTP: {
        type: Sequelize.TEXT
      },
      uniqueLINK: {
        allowNull: true,
        type: Sequelize.STRING
      },
      uniqueHASS: {
        allowNull: true,
        type: Sequelize.STRING
      },
      uniqueIMGINFLUENCELINK: {
        allowNull: true,
        type: Sequelize.STRING
      },
      uniqueIMGINFLUENCEPERCENTAGE: {
        allowNull: true,
        type: Sequelize.STRING
      },
      uniqueWIDTH: {
        allowNull: true,
        type: Sequelize.STRING
      },
      uniqueHEIGHT: {
        allowNull: true,
        type: Sequelize.STRING
      },
      uniqueINTERATION: {
        allowNull: true,
        type: Sequelize.STRING
      },
      uniqueLUCKYNUMBER: {
        allowNull: true,
        type: Sequelize.STRING
      },
      uniqueHASS: {
        allowNull: true,
        type: Sequelize.STRING
      },
      uniqueLINKVIDEO: {
        allowNull: true,
        type: Sequelize.STRING
      },
      uniqueSTATUS: {
        allowNull: true,
        type: Sequelize.STRING
      },
      uniqueDOWNLOADAVIABLE: {
        allowNull: true,
        type: Sequelize.BOOLEAN
      },
      uniqueASPECTRATIO: {
        allowNull: true,
        type: Sequelize.STRING
      },
      uniqueVIDEOFRAME: {
        allowNull: true,
        type: Sequelize.STRING
      },
      uniqueVIDEOSTYLE: {
        allowNull: true,
        type: Sequelize.STRING
      },
      uniqueVIDEODURATION: {
        allowNull: true,
        type: Sequelize.STRING
      },
      uniqueVIDEOFPS: {
        allowNull: true,
        type: Sequelize.STRING
      },
      uniqueVIDEOLOOP: {
        allowNull: true,
        type: Sequelize.BOOLEAN
      },
      uniqueVIDEORESOLUTION: {
        allowNull: true,
        type: Sequelize.STRING
      },
      walletCREATOR: {
        allowNull: true,
        type: Sequelize.INTEGER.UNSIGNED
      },
      userCREATOR: {
        allowNull: true,
        type: Sequelize.INTEGER.UNSIGNED
      },
      unique_art_moventID: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      unique_elementID: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      unique_moodID: {
        allowNull: true,
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
    await queryInterface.dropTable('uniques');
  }
};