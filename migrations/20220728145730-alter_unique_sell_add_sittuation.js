'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('unique_sells', 'unique_sellSITUATION', {
      type: Sequelize.ENUM("FAIL","SUCCESS","WAITING","NO-MET"),
        defaultValue: "WAITING",
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('unique_sells', 'unique_sellSITUATION', {
      type: Sequelize.ENUM("FAIL","SUCCESS","WAITING"),
        defaultValue: "WAITING",
    });
  }
};