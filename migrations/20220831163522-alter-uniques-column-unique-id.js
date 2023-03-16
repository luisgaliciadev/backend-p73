'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('algorithm_requests', 'uniqueID', {
      type: Sequelize.INTEGER,
      references: {
        model: 'uniques',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  },
  
};
