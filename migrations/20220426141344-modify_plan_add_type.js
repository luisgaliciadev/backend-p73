'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('plans', 'planTYPE', {
      allowNull: false,
      type: Sequelize.ENUM("ARTIST","GALLERIST"),
      defaultValue: "ARTIST"
    });
    
  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.removeColumn('plans', 'planTYPE');
  }
};
