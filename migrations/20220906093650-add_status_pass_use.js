'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('user_pass_art_movement_uses', 'user_pass_art_movement_useSTATUS', {
      type: Sequelize.ENUM("ACTIVE","INACTIVE"),
      defaultValue: "ACTIVE"
    });
    await queryInterface.addColumn('user_pass_mood_uses', 'user_pass_mood_useSTATUS', {
      type: Sequelize.ENUM("ACTIVE","INACTIVE"),
      defaultValue: "ACTIVE"
    });
    await queryInterface.addColumn('user_pass_element_uses', 'user_pass_element_useSTATUS', {
      type: Sequelize.ENUM("ACTIVE","INACTIVE"),
      defaultValue: "ACTIVE"
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
