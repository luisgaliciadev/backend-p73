'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('unique_sells', 'unique_sellAUCTIONBOOKINGPRICE', {
      type: Sequelize.FLOAT
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('unique_sells', 'unique_sellAUCTIONBOOKINGPRICE', {});
  }
};