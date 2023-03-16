'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('uniques', 'uniquePRICETOKEN', {
      type: Sequelize.FLOAT,
      defaultValue: 0
    });
    await queryInterface.changeColumn('uniques', 'uniqueROYALTYPERCENTAGE', {
      type: Sequelize.FLOAT,
      defaultValue: 0
    });
    await queryInterface.changeColumn('uniques', 'uniqueSITUATION', {
      type: Sequelize.ENUM("PUBLIC","PRIVATE","SALE","AUCTION"),
      defaultValue: "PUBLIC",
    });
    await queryInterface.addColumn('uniques', 'uniqueCREATIONWITHOUTPLAN', {
      type: Sequelize.BOOLEAN,
      defaultValue: false
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
