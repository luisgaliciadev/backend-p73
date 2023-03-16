'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
     await queryInterface.bulkInsert('unique_moods', [{
      unique_moodTEXT: "Spaventato",
      unique_moodCOLOR: "#C25C1F",
      unique_moodCODE: null,
      createdAt: '2021-11-30 00:00:00',
      updatedAt: '2021-11-30 00:00:00', languageID: 3,
      unique_moodICON: 'scared.svg',
      unique_moodCOLOR_APP: "background: transparent linear-gradient(105deg, #FF002B 0%, #7F0202 100%) 0% 0% no-repeat padding-box;",
      },
      {
        unique_moodTEXT: "Ansioso",
        unique_moodCOLOR: "#707070",
        unique_moodCODE: null,
        createdAt: '2021-11-30 00:00:00',
        updatedAt: '2021-11-30 00:00:00', languageID: 3,
        unique_moodICON: 'anxious.svg',
        unique_moodCOLOR_APP: "background: transparent linear-gradient(105deg, #FF002B 0%, #7F0202 100%) 0% 0% no-repeat padding-box;",
      },
      {
        unique_moodTEXT: "Arrabbiato",
        unique_moodCOLOR: "#DA2F47",
        unique_moodCODE: null,
        createdAt: '2021-11-30 00:00:00',
        updatedAt: '2021-11-30 00:00:00', languageID: 3,
        unique_moodICON: 'angry.svg',
        unique_moodCOLOR_APP: "background: transparent linear-gradient(105deg, #FF002B 0%, #7F0202 100%) 0% 0% no-repeat padding-box;",
      },
      {
        unique_moodTEXT: "Triste",
        unique_moodCOLOR: "#343434",
        unique_moodCODE: null,
        createdAt: '2021-11-30 00:00:00',
        updatedAt: '2021-11-30 00:00:00', languageID: 3,
        unique_moodICON: 'sad.svg',
        unique_moodCOLOR_APP: "background: transparent linear-gradient(105deg, #FF002B 0%, #7F0202 100%) 0% 0% no-repeat padding-box;",
      },
      {
        unique_moodTEXT: "Melanconico",
        unique_moodCOLOR: "#707070",
        unique_moodCODE: null,
        createdAt: '2021-11-30 00:00:00',
        updatedAt: '2021-11-30 00:00:00', languageID: 3,
        unique_moodICON: 'melancholic.svg',
        unique_moodCOLOR_APP: "background: transparent linear-gradient(105deg, #FF002B 0%, #7F0202 100%) 0% 0% no-repeat padding-box;",
      },
      {
        unique_moodTEXT: "Infastidito",
        unique_moodCOLOR: "#343434",
        unique_moodCODE: null,
        createdAt: '2021-11-30 00:00:00',
        updatedAt: '2021-11-30 00:00:00', languageID: 3,
        unique_moodICON: 'annoyed.svg',
        unique_moodCOLOR_APP: "background: transparent linear-gradient(105deg, #FF002B 0%, #7F0202 100%) 0% 0% no-repeat padding-box;",
      },
      {
        unique_moodTEXT: "Eccitato",
        unique_moodCOLOR: "#9E30FF",
        unique_moodCODE: null,
        createdAt: '2021-11-30 00:00:00',
        updatedAt: '2021-11-30 00:00:00', languageID: 3,
        unique_moodICON: 'excited.svg',
        unique_moodCOLOR_APP: "background: transparent linear-gradient(105deg, #FF002B 0%, #7F0202 100%) 0% 0% no-repeat padding-box;",
      },
      {
        unique_moodTEXT: "Euforico",
        unique_moodCOLOR: "#FF00C4",
        unique_moodCODE: null,
        createdAt: '2021-11-30 00:00:00',
        updatedAt: '2021-11-30 00:00:00', languageID: 3,
        unique_moodICON: 'euphoric.svg',
        unique_moodCOLOR_APP: "background: transparent linear-gradient(105deg, #FF002B 0%, #7F0202 100%) 0% 0% no-repeat padding-box;",
      },
      {
        unique_moodTEXT: "Impotente",
        unique_moodCOLOR: "#7D7996",
        unique_moodCODE: null,
        createdAt: '2021-11-30 00:00:00',
        updatedAt: '2021-11-30 00:00:00', languageID: 3,
        unique_moodICON: 'helpless.svg',
        unique_moodCOLOR_APP: "background: transparent linear-gradient(105deg, #FF002B 0%, #7F0202 100%) 0% 0% no-repeat padding-box;",
      },
      {
        unique_moodTEXT: "Felice",
        unique_moodCOLOR: "#FF00C4",
        unique_moodCODE: null,
        createdAt: '2021-11-30 00:00:00',
        updatedAt: '2021-11-30 00:00:00', languageID: 3,
        unique_moodICON: 'happy.svg',
        unique_moodCOLOR_APP: "background: transparent linear-gradient(105deg, #FF002B 0%, #7F0202 100%) 0% 0% no-repeat padding-box;",
      },
      {
        unique_moodTEXT: "Odioso",
        unique_moodCOLOR: "#7D7996",
        unique_moodCODE: null,
        createdAt: '2021-11-30 00:00:00',
        updatedAt: '2021-11-30 00:00:00', languageID: 3,
        unique_moodICON: 'obnoxious.svg',
        unique_moodCOLOR_APP: "background: transparent linear-gradient(105deg, #FF002B 0%, #7F0202 100%) 0% 0% no-repeat padding-box;",
      },
      {
        unique_moodTEXT: "No mood",
        unique_moodCOLOR: "#7D7996",
        unique_moodCODE: null,
        createdAt: '2021-11-30 00:00:00',
        updatedAt: '2021-11-30 00:00:00', languageID: 3,
        unique_moodICON: 'no_mood.svg',
        unique_moodCOLOR_APP: "background: transparent linear-gradient(105deg, #FF002B 0%, #7F0202 100%) 0% 0% no-repeat padding-box;",
      },
    ], {});
    },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('unique_moods', null, {});
    
  }
};
