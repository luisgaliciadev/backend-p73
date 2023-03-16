'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('promtps', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      promtpTEXT: {
        type: Sequelize.TEXT
      },
      walletID: {
        allowNull: true,
        type: Sequelize.INTEGER.UNSIGNED
      },
      userID: {
        allowNull: true,
        type: Sequelize.INTEGER.UNSIGNED
      },
      promtpSTATUS: {
        allowNull: false,
        type: Sequelize.ENUM("WITHOUTUSING","USED","DISABLE"),
        defaultValue: "WITHOUTUSING",
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
    await queryInterface.dropTable('Promtps');
  }
};