'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.changeColumn('uniques', 'uniqueSITUATION', {
      type: Sequelize.ENUM("PUBLIC","PRIVATE","SALE","AUCTION"),
      defaultValue: "PUBLIC",
    });
  },

  async down (queryInterface, Sequelize) {
    
  }
};
