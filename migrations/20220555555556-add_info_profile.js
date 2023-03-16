'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('profiles', 'profileUSERNAME', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('profiles', 'profileBANNER', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.addColumn('profiles', 'profileVERIFY', {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    });
  },

  async down (queryInterface, Sequelize) {
    
  }
};
