'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('profiles', 'profileTYPE', {
      type: Sequelize.ENUM("CREATOR","INVESTOR","GALLERY","CREATOR/INVESTOR"),
      defaultValue: "CREATOR",
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('profiles', 'profileTYPE', {});
  }
};
