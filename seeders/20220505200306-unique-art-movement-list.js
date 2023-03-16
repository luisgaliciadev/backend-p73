'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
     await queryInterface.bulkInsert('unique_art_movents', [{
      unique_art_moventTEXT: "None",
      unique_art_moventtCOLOR: null,
      unique_art_moventCODE: "NONE",
      unique_art_moventIMAGE: "none.png",
      createdAt: '1899-11-30 00:00:00',
      updatedAt: '1899-11-30 00:00:00'
     },
     {
      unique_art_moventTEXT: "Abstract",
      unique_art_moventtCOLOR: null,
      unique_art_moventCODE: "ABSTRACT",
      unique_art_moventIMAGE: "abstract.png",
      createdAt: '1899-11-30 00:00:00',
      updatedAt: '1899-11-30 00:00:00'
     },
     {
      unique_art_moventTEXT: "Action art",
      unique_art_moventtCOLOR: null,
      unique_art_moventCODE: null,
      unique_art_moventIMAGE: "action_art.png",
      createdAt: '1899-11-30 00:00:00',
      updatedAt: '1899-11-30 00:00:00'
     },
     {
      unique_art_moventTEXT: "Art Brut",
      unique_art_moventtCOLOR: null,
      unique_art_moventCODE: null,
      unique_art_moventIMAGE: "art_brut.png",
      createdAt: '1899-11-30 00:00:00',
      updatedAt: '1899-11-30 00:00:00'
     },
     {
      unique_art_moventTEXT: "Art Deco",
      unique_art_moventtCOLOR: null,
      unique_art_moventCODE: null,
      unique_art_moventIMAGE: "art_deco.png",
      createdAt: '1899-11-30 00:00:00',
      updatedAt: '1899-11-30 00:00:00'
     },
     {
      unique_art_moventTEXT: "Art Naif",
      unique_art_moventtCOLOR: null,
      unique_art_moventCODE: null,
      unique_art_moventIMAGE: "art_naif.png",
      createdAt: '1899-11-30 00:00:00',
      updatedAt: '1899-11-30 00:00:00'
     },
     {
      unique_art_moventTEXT: "Baroque",
      unique_art_moventtCOLOR: null,
      unique_art_moventCODE: null,
      unique_art_moventIMAGE: "baroque.png",
      createdAt: '1899-11-30 00:00:00',
      updatedAt: '1899-11-30 00:00:00'
     },
     {
      unique_art_moventTEXT: "Apocalyptic",
      unique_art_moventtCOLOR: null,
      unique_art_moventCODE: null,
      unique_art_moventIMAGE: "apocalyptic.png",
      createdAt: '1899-11-30 00:00:00',
      updatedAt: '1899-11-30 00:00:00'
     },
     {
      unique_art_moventTEXT: "cubism",
      unique_art_moventtCOLOR: null,
      unique_art_moventCODE: null,
      unique_art_moventIMAGE: "cubism.png",
      createdAt: '1899-11-30 00:00:00',
      updatedAt: '1899-11-30 00:00:00'
     },
     {
      unique_art_moventTEXT: "dadaism",
      unique_art_moventtCOLOR: null,
      unique_art_moventCODE: null,
      unique_art_moventIMAGE: "dadaism.png",
      createdAt: '1899-11-30 00:00:00',
      updatedAt: '1899-11-30 00:00:00'
     },
     {
      unique_art_moventTEXT: "expressionism",
      unique_art_moventtCOLOR: null,
      unique_art_moventCODE: null,
      unique_art_moventIMAGE: "expressionism.png",
      createdAt: '1899-11-30 00:00:00',
      updatedAt: '1899-11-30 00:00:00'
     },
     {
      unique_art_moventTEXT: "Futurism",
      unique_art_moventtCOLOR: null,
      unique_art_moventCODE: null,
      unique_art_moventIMAGE: "futurism.png",
      createdAt: '1899-11-30 00:00:00',
      updatedAt: '1899-11-30 00:00:00'
     },
     {
      unique_art_moventTEXT: "Gothic",
      unique_art_moventtCOLOR: null,
      unique_art_moventCODE: null,
      unique_art_moventIMAGE: "gothic.png",
      createdAt: '1899-11-30 00:00:00',
      updatedAt: '1899-11-30 00:00:00'
     },
     {
      unique_art_moventTEXT: "Impressionism",
      unique_art_moventtCOLOR: null,
      unique_art_moventCODE: null,
      unique_art_moventIMAGE: "impressionism.png",
      createdAt: '1899-11-30 00:00:00',
      updatedAt: '1899-11-30 00:00:00'
     },
     {
      unique_art_moventTEXT: "Metapshisycal",
      unique_art_moventtCOLOR: null,
      unique_art_moventCODE: null,
      unique_art_moventIMAGE: "metapshisycal.png",
      createdAt: '1899-11-30 00:00:00',
      updatedAt: '1899-11-30 00:00:00'
     },
     {
      unique_art_moventTEXT: "Naturalism",
      unique_art_moventtCOLOR: null,
      unique_art_moventCODE: null,
      unique_art_moventIMAGE: "naturalism.png",
      createdAt: '1899-11-30 00:00:00',
      updatedAt: '1899-11-30 00:00:00'
     },
     {
      unique_art_moventTEXT: "Pixel",
      unique_art_moventtCOLOR: null,
      unique_art_moventCODE: null,
      unique_art_moventIMAGE: "pixel.png",
      createdAt: '1899-11-30 00:00:00',
      updatedAt: '1899-11-30 00:00:00'
     },
     {
      unique_art_moventTEXT: "Pointilism",
      unique_art_moventtCOLOR: null,
      unique_art_moventCODE: null,
      unique_art_moventIMAGE: "pointilism.png",
      createdAt: '1899-11-30 00:00:00',
      updatedAt: '1899-11-30 00:00:00'
     },
     {
      unique_art_moventTEXT: "Realism",
      unique_art_moventtCOLOR: null,
      unique_art_moventCODE: null,
      unique_art_moventIMAGE: "realism.png",
      createdAt: '1899-11-30 00:00:00',
      updatedAt: '1899-11-30 00:00:00'
     },
     {
      unique_art_moventTEXT: "Renaissance",
      unique_art_moventtCOLOR: null,
      unique_art_moventCODE: null,
      unique_art_moventIMAGE: "renaissance.png",
      createdAt: '1899-11-30 00:00:00',
      updatedAt: '1899-11-30 00:00:00'
     },
     {
      unique_art_moventTEXT: "Romanticism",
      unique_art_moventtCOLOR: null,
      unique_art_moventCODE: null,
      unique_art_moventIMAGE: "romanticism.png",
      createdAt: '1899-11-30 00:00:00',
      updatedAt: '1899-11-30 00:00:00'
     },
     {
      unique_art_moventTEXT: "Mad Max",
      unique_art_moventtCOLOR: null,
      unique_art_moventCODE: null,
      unique_art_moventIMAGE: "mad_max.png",
      createdAt: '1899-11-30 00:00:00',
      updatedAt: '1899-11-30 00:00:00'
     },
     {
      unique_art_moventTEXT: "Surrealism",
      unique_art_moventtCOLOR: null,
      unique_art_moventCODE: null,
      unique_art_moventIMAGE: "surrealism.png",
      createdAt: '1899-11-30 00:00:00',
      updatedAt: '1899-11-30 00:00:00'
     },
     {
      unique_art_moventTEXT: "Symbolism",
      unique_art_moventtCOLOR: null,
      unique_art_moventCODE: null,
      unique_art_moventIMAGE: "symbolism.png",
      createdAt: '1899-11-30 00:00:00',
      updatedAt: '1899-11-30 00:00:00'
     },
    ], {});
    
  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.bulkDelete('unique_art_movents', null, {});
    
  }
};
