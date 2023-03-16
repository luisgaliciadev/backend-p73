"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("uniques", "unique_TYPEALGORITHM", {
      type: Sequelize.STRING,
    });
  },

  async down(queryInterface, Sequelize) {},
};
