'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('unique_moods', 'unique_moodCOLOR_APP', {
      allowNull: true,
      type: Sequelize.STRING,
    });
    
  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.removeColumn('unique_moods', 'unique_moodCOLOR_APP');
  }
};