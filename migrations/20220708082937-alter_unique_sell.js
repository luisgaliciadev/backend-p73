'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('unique_sells', 'unique_sellSITUATION', {
      type: Sequelize.ENUM("FAIL","SUCCESS","WAITING"),
        defaultValue: "WAITING",
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('unique_sells', 'unique_sellSITUATION', {});
  }
};