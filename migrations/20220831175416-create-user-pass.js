'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_passes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userID: {
        type: Sequelize.INTEGER
      },
      user_passINTERATIONQUANTITYMAX73DIFFUSION: {
        type: Sequelize.INTEGER,
        defaultValue: 50
      },
      user_passINTERATIONQUANTITYMAXCAMY: {
        type: Sequelize.INTEGER
      },
      user_passQUALITYLEVEL: {
        type: Sequelize.ENUM("DEFAULT","HIGH","SUPREME"),
        defaultValue: "DEFAULT"
      },
      user_passBALANCEARTMOVEMENT: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      user_passBALANCEMOOD: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      user_passBALANCEELEMENT: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      user_passSTARTINGIMG: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      user_passVIDEO: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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
    await queryInterface.dropTable('user_passes');
  }
};