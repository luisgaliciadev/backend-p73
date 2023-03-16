'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('paternity_feeds', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      promtp_fatherID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'promtps',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      promtp_sonID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'promtps',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
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
    await queryInterface.dropTable('PaternityFeeds');
  }
};