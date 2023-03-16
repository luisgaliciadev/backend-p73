'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('algorithm_requests', 'algorithm_requestPROMTPTEXT', {
      type: Sequelize.STRING
    });
  },
  

  async down (queryInterface, Sequelize) {
    await queryInterface.dropColumn('algorithm_requestPROMTPTEXT');
  }
};
