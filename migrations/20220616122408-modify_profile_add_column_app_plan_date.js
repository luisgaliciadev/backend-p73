module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('profiles', 'planDATESTART', {
      type: Sequelize.DATE
    });
    await queryInterface.addColumn('profiles', 'planDATEEND', {
      type: Sequelize.DATE
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