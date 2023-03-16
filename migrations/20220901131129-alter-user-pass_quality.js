'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('user_passes', 'user_passQUALITYLEVEL', {
      type: Sequelize.ENUM("DEFAULT","HIGH","EXCELENT","SUPREME"),
      defaultValue: "DEFAULT"
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
