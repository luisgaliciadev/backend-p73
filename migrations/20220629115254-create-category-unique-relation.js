'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('category_unique_relations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      categoryID: {
        type: Sequelize.INTEGER
      },
      uniqueID: {
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
    await queryInterface.dropTable('category_unique_relations');
  }
};