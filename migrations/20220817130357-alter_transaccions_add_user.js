'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('transactions', 'userID', {
      type: Sequelize.INTEGER});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropColumn('userID');
  }
};
