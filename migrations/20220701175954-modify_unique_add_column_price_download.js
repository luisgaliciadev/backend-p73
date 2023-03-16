module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('uniques', 'uniquePRICEDOWNLOAD', {
      type: Sequelize.FLOAT,
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