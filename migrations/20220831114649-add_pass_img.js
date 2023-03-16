'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.addColumn('passes', 'passIMG', {
      type: Sequelize.STRING,
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
