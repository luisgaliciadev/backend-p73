'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('stories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      linkTEXT: {
        type: Sequelize.STRING
      },
      file: {
        type: Sequelize.STRING
      },
      link: {
        type: Sequelize.STRING
      },
      typeFileID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'story_file_types',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      userID: {
        type: Sequelize.STRING
      },
      dateExp: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable('stories');
  }
};

