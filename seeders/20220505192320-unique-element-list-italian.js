'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('unique_elements', [{
      unique_elementTEXT: "none",
      unique_elementCOLOR: null,
      unique_elementCODE: null,
      languageID: 3,
      createdAt: '2021-11-30 00:00:00',
      updatedAt: '2021-11-30 00:00:00', languageID: 3,
    },
    {
      unique_elementTEXT: "spazio",
      unique_elementCOLOR: "background: transparent linear-gradient(92deg, #FF00F7 0%, #43007D 51%, #1A0C60 100%) 0% 0% no-repeat padding-box;",
      unique_elementCODE: null,
      languageID: 3,
      createdAt: '2021-11-30 00:00:00',
      updatedAt: '2021-11-30 00:00:00', languageID: 3,
    },
    {
      unique_elementTEXT: "fuoco",
      unique_elementCOLOR: "background: transparent linear-gradient(99deg, #F9D800 0%, #F79100 33%, #C50000 100%) 0% 0% no-repeat padding-box;",
      unique_elementCODE: null,
      languageID: 3,
      createdAt: '2021-11-30 00:00:00',
      updatedAt: '2021-11-30 00:00:00', languageID: 3,
    },
    {
      unique_elementTEXT: "acqua",
      unique_elementCOLOR: "background: transparent linear-gradient(98deg, #6085FF 0%, #2A36CD 45%, #2A36CD 45%, #2A36CD 45%, #1A00A4 100%) 0% 0% no-repeat padding-box;",
      unique_elementCODE: null,
      languageID: 3,
      createdAt: '2021-11-30 00:00:00',
      updatedAt: '2021-11-30 00:00:00', languageID: 3,
    },
    {
      unique_elementTEXT: "aria",
      unique_elementCOLOR: "background: transparent linear-gradient(97deg, #01DCFF 0%, #556FFF 100%) 0% 0% no-repeat padding-box;",
      unique_elementCODE: null,
      languageID: 3,
      createdAt: '2021-11-30 00:00:00',
      updatedAt: '2021-11-30 00:00:00', languageID: 3,
    },
    {
      unique_elementTEXT: "terra",
      unique_elementCOLOR: "background: transparent linear-gradient(95deg, #00A220 0%, #959F00 52%, #75583B 100%) 0% 0% no-repeat padding-box;",
      unique_elementCODE: null,
      languageID: 3,
      createdAt: '2021-11-30 00:00:00',
      updatedAt: '2021-11-30 00:00:00', languageID: 3,
    }], {});
    
  },

  async down (queryInterface, Sequelize) {
    
      await queryInterface.bulkDelete('unique_elements', null, {});
     
  }
};
