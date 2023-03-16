'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('unique_sells', 'unique_sellDATEEXPIRE', {
      type: Sequelize.DATE
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('unique_sells', 'unique_sellDATEEXPIRE', {});
  }
};
