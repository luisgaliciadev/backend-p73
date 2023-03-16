'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('uniques', 'uniqueSTATUS', {
      type: Sequelize.ENUM("UNIQUE","DRAFT","ARTWORK","DELETE"),
      defaultValue: "ARTWORK",
    });
  },

  async down (queryInterface, Sequelize) {
  }
};
