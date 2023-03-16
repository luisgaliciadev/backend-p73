'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('profiles', 'profileFULLNAME', {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn('profiles', 'profileADDRESS', {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn('profiles', 'profileBIRTHDATE', {
      type: Sequelize.DATE,
    });
    await queryInterface.addColumn('profiles', 'profileDOCUMENTIDEN', {
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