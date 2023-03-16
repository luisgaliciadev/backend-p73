'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('plans', [{
      planTITLE: 'ONE',
      planCODE: 'ONEEN',
      planFULLPRICE: 59.70,
      planDISCOUNTPRICE: 47.70,
      planQUANTITYPROMTP: 3,
      languageID: 1,
      planTYPE: 'ARTIST',
      createdAt: '1899-11-30 00:00:00',
      updatedAt: '1899-11-30 00:00:00'
    },
    {
      planTITLE: 'DOS',
      planCODE: 'DOSEN',
      planFULLPRICE: 199.00,
      planDISCOUNTPRICE: 139.00,
      planQUANTITYPROMTP: 10,
      languageID: 1,
      planTYPE: 'ARTIST',
      createdAt: '1899-11-30 00:00:00',
      updatedAt: '1899-11-30 00:00:00'
   },
   {
    planTITLE: 'TRES',
    planCODE: 'TRESEN',
    planFULLPRICE: 995.000,
    planDISCOUNTPRICE: 497.70,
    planQUANTITYPROMTP: 50,
    languageID: 1,
    planTYPE: 'ARTIST',
    createdAt: '1899-11-30 00:00:00',
    updatedAt: '1899-11-30 00:00:00'
   },
   {
    planTITLE: 'Collective',
    planCODE: 'COLLECTIVEEN',
    planFULLPRICE: 2737,
    planDISCOUNTPRICE: 2200,
    languageID: 1,
    planTYPE: 'GALLERIST',
    createdAt: '1899-11-30 00:00:00',
    updatedAt: '1899-11-30 00:00:00'
 },
   {
    planTITLE: 'Individual',
    planCODE: 'INDIVIDUALEN',
    planFULLPRICE: 6021,
    planDISCOUNTPRICE: 4500,
    languageID: 1,
    planTYPE: 'GALLERIST',
    createdAt: '1899-11-30 00:00:00',
    updatedAt: '1899-11-30 00:00:00'
  },
 {
  planTITLE: 'Exclusive',
  planCODE: 'EXCLUSIVEEN',
  planFULLPRICE: 24385,
  planDISCOUNTPRICE: 16900,
  languageID: 1,
  planTYPE: 'GALLERIST',
  createdAt: '1899-11-30 00:00:00',
  updatedAt: '1899-11-30 00:00:00'
 }], {});
},

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Plans', null, {});
  }
};
