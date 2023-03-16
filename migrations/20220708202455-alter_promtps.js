'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('promtps', 'promtpDATEEXPIRE', {
      type: Sequelize.DATE
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('promtps', 'promtpDATEEXPIRE', {});
  }
};
