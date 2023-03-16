'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('uniques', 'uniqueDESCRIPTION', {
      type: Sequelize.STRING
    });
  },
  

  async down (queryInterface, Sequelize) {
    await queryInterface.dropColumn('uniqueDESCRIPTION');
  }
};
