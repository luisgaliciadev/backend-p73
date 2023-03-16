'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('uniques', 'uniqueLIKECOUNT', {
      type: Sequelize.INTEGER,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('uniques', 'uniqueLIKECOUNT');
  }
};
