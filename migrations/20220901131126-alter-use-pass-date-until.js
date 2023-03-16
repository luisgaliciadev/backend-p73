'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('user_pass_art_movement_uses', 'user_pass_art_movement_useDATEUNTIL', {
      type: Sequelize.DATE,
    });
    await queryInterface.addColumn('user_pass_mood_uses', 'user_pass_mood_useDATEUNTIL', {
      type: Sequelize.DATE,
    });
    await queryInterface.addColumn('user_pass_element_uses', 'user_pass_element_useDATEUNTIL', {
      type: Sequelize.DATE,
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
