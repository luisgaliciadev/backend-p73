'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('profile_types', 'description', {
      allowNull: true,
      type: Sequelize.STRING,
    });
    
  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.removeColumn('profile_types', 'description');
  }
};
