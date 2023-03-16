'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('algorithm_requests', 'uniqueID', {
      type: Sequelize.INTEGER,
      references: {
        model: 'uniques',
        key: 'id'
      },
    });
  },
  
  async down (queryInterface, Sequelize) {
    await queryInterface.dropColumn('uniqueID');
  }
};
