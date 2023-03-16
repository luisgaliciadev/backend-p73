'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('items', 'itemBOLD', {
      allowNull: false,
      type: Sequelize.BOOLEAN,
      defaultValue: false
    });
    
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.removeColumn('items', 'itemBOLD');
  }
};
