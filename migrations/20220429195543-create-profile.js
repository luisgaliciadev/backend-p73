'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('profiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      description: {
        allowNull: true,
        type: Sequelize.STRING(400)
      },
      img: {
        type: Sequelize.STRING
      },
      userID: {
        allowNull: false,
        type: Sequelize.STRING
      },
      idProfileType: {
        allowNull: false,
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'profile_types',
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
    await queryInterface.dropTable('profiles');
  }
};