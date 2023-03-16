'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     await queryInterface.bulkInsert('languages', [{
         languageTITLE: 'ENGLISH',
         languageCODE: 'EN',
         createdAt: '1899-11-30 00:00:00',
         updatedAt: '1899-11-30 00:00:00'

       },
       {
        languageTITLE: 'SPANISH',
        languageCODE: 'ES',
        createdAt: '1899-11-30 00:00:00',
        updatedAt: '1899-11-30 00:00:00'
      },
      {
        languageTITLE: 'ITALIAN',
        languageCODE: 'IT',
        createdAt: '1899-11-30 00:00:00',
        updatedAt: '1899-11-30 00:00:00'
      },
      {
        languageTITLE: 'ROMANIAN',
        languageCODE: 'RO',
        createdAt: '1899-11-30 00:00:00',
        updatedAt: '1899-11-30 00:00:00'
      }], {});
  },

  async down (queryInterface, Sequelize) {
   
      await queryInterface.bulkDelete('language', null, {});
     
  }
};
