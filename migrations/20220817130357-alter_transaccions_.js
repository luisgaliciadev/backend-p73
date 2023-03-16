'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('transactions', 'transactionSTATUS', {
      type: Sequelize.ENUM("COMPLETED","PURCHASED","EXCHANGED","ADDED","PENDING","REFUSED"),
      defaultValue: "PENDING"});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropColumn('transactionSTATUS');
  }
};
