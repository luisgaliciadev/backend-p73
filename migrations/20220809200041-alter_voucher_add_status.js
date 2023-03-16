'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('vouchers', 'voucherSTATUS', {
      type: Sequelize.ENUM("UNUSED","USED","SALE","DISABLED"),
        defaultValue: "UNUSED",
    });
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.dropColumn('voucherSTATUS');
    }
};
