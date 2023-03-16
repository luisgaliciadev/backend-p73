'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('app_plans', 'iteration73Diffusion', {
      type: Sequelize.INTEGER,
    });
    await queryInterface.changeColumn('app_plans', 'iterationCamy', {
      type: Sequelize.INTEGER,
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
