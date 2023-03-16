'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('algorithm_requests', 'algorithm_requestQUALITY', {
      type: Sequelize.ENUM("DEFAULT","HIGHT","EXCELLENT","SUPREME"),
      defaultValue: "DEFAULT"
    });
    await queryInterface.addColumn('algorithm_requests', 'algorithm_requestTYPEALGORITHM', {
      type: Sequelize.ENUM("73D","CAMY")
    });
    await queryInterface.addColumn('algorithm_requests', 'algorithm_requestIMGSTARINGPERCENTAGE', {
      type: Sequelize.INTEGER
    });
  },
  

  async down (queryInterface, Sequelize) {
    await queryInterface.dropColumn('algorithm_requestQUALITY');
    await queryInterface.dropColumn('algorithm_requestTYPEALGORITHM');
    await queryInterface.dropColumn('algorithm_requestIMGSTARINGPERCENTAGE');
  }
};
