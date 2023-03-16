'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('my_tokens', {
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
    await queryInterface.dropTable('my_tokens');
  }
};