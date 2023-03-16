'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('passes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      passNAME: {
        type: Sequelize.STRING
      },
      passTYPE: {
        type: Sequelize.ENUM("MOOD","ELEMENT","ART-MOVEMENT","ADD-IMG","ITERATION","QUALITY","VIDEO")
      },
      passAMOUNT: {
        type: Sequelize.STRING
      },
      passPRICE: {
        type: Sequelize.FLOAT
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
    await queryInterface.dropTable('passes');
  }
};