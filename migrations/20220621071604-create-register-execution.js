'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('register_executions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userID: {
        type: Sequelize.INTEGER
      },
      uniqueID: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'uniques',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      register_executionSTATUS: {
        type: Sequelize.ENUM("SUCCESSFUL","WRONG","PENDING"),
        defaultValue: "PENDING",
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
    await queryInterface.dropTable('register_executions');
  }
};