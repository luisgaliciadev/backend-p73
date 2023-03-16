module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('profiles', 'planID', {
      type: Sequelize.INTEGER,
      defaultValue: 1
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