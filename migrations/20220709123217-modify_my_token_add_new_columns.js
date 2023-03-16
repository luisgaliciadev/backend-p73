'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('my_tokens', 'mytokenSITUATION', {
      type: Sequelize.ENUM("PRIVATE","SALE","AUCTION","PUBLIC"),
      defaultValue: "PUBLIC",
    });
    await queryInterface.addColumn('my_tokens', 'mytokenQUANTITYAVAIBLE', {
      type: Sequelize.INTEGER,
      defaultValue: 0
    });
    await queryInterface.addColumn('my_tokens', 'mytokenQUANTITYBUY', {
      type: Sequelize.INTEGER,
      defaultValue: 0
    });
    await queryInterface.addColumn('my_tokens', 'mytokenPRICEBUY', {
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
