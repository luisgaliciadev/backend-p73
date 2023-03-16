'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('user_passes', 'user_passINTERATIONQUANTITYMAX73DIFFUSION', {
      type: Sequelize.INTEGER,
      defaultValue: 0
    });
    await queryInterface.changeColumn('user_passes', 'user_passINTERATIONQUANTITYMAXCAMY', {
      type: Sequelize.INTEGER,
      defaultValue: 0
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
