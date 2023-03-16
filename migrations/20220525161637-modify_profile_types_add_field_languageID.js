'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('profile_types', 'languageID', {
      allowNull: true,
      type: Sequelize.INTEGER,
    });
    
  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.removeColumn('profile_types', 'languageID');
  }
};
