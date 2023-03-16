'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('uniques', 'uniquePRICETOKEN', {
      type: Sequelize.DECIMAL
    });
    await queryInterface.addColumn('uniques', 'uniqueROYALTYPERCENTAGE', {
      type: Sequelize.DECIMAL
    });
    await queryInterface.addColumn('uniques', 'uniqueDIGITALCONTRACTADDRESS', {
      type: Sequelize.TEXT
    });
    await queryInterface.addColumn('uniques', 'project_tokenID', {
      type: Sequelize.INTEGER
    });
    await queryInterface.addColumn('uniques', 'uniqueTOKENAVAILABLE', {
      type: Sequelize.INTEGER,
      defaultValue: 100,
    });
    await queryInterface.addColumn('uniques', 'uniqueSITUATION', {
      type: Sequelize.ENUM("PUBLIC","PRIVATE","SALE","AUCTION"),
      defaultValue: "PUBLIC",
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('uniques', 'uniquePRICETOKEN', {});
    await queryInterface.removeColumn('uniques', 'uniqueROYALTYPERCENTAGE', {});
    await queryInterface.removeColumn('uniques', 'uniqueSITUATION', {});
    await queryInterface.removeColumn('uniques', 'uniqueDIGITALCONTRACTADDRESS', {});
    await queryInterface.removeColumn('uniques', 'project_tokenID', {});
    await queryInterface.removeColumn('uniques', 'uniqueTOKENAVAILABLE', {});
  }
};
