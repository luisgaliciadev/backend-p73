'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('uniques', 'uniqueQUALITY', {
      type: Sequelize.ENUM("DEFAULT","HIGHT","EXCELLENT","SUPREME"),
      defaultValue: "DEFAULT"
    });
  },
  

  async down (queryInterface, Sequelize) {
    await queryInterface.dropColumn('uniqueQUALITY');
  }
};
