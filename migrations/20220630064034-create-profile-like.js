'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('profile_likes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      profile_likeSTATUS: {
        type: Sequelize.BOOLEAN
      },
      profileID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'profiles',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      userID: {
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
    await queryInterface.dropTable('profile_likes');
  }
};