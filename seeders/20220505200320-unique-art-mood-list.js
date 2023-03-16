'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert('unique_moods', [{
      unique_moodTEXT: "Scared",
      unique_moodCOLOR: "#C25C1F",
      unique_moodCODE: null,
      createdAt: '1899-11-30 00:00:00',
      updatedAt: '1899-11-30 00:00:00',
      unique_moodICON: 'scared.svg',
      unique_moodCOLOR_APP: "background: transparent linear-gradient(105deg, #FF002B 0%, #7F0202 100%) 0% 0% no-repeat padding-box;",
      },
      {
        unique_moodTEXT: "Anxious",
        unique_moodCOLOR: "#707070",
        unique_moodCODE: null,
        createdAt: '1899-11-30 00:00:00',
        updatedAt: '1899-11-30 00:00:00',
        unique_moodICON: 'anxious.svg',
        unique_moodCOLOR_APP: "background: transparent linear-gradient(105deg, #3C939A 0%, #AABE58 100%) 0% 0% no-repeat padding-box;",
      },
      {
        unique_moodTEXT: "Angry",
        unique_moodCOLOR: "#DA2F47",
        unique_moodCODE: null,
        createdAt: '1899-11-30 00:00:00',
        updatedAt: '1899-11-30 00:00:00',
        unique_moodICON: 'angry.svg',
        unique_moodCOLOR_APP: "background: transparent linear-gradient(105deg, #FF5D84 0%, #FF8800 100%) 0% 0% no-repeat padding-box;",
      },
      {
        unique_moodTEXT: "Sad",
        unique_moodCOLOR: "#343434",
        unique_moodCODE: null,
        createdAt: '1899-11-30 00:00:00',
        updatedAt: '1899-11-30 00:00:00',
        unique_moodICON: 'sad.svg',
        unique_moodCOLOR_APP: "background: transparent linear-gradient(105deg, #3C939A 0%, #AABE58 100%) 0% 0% no-repeat padding-box;",
      },
      {
        unique_moodTEXT: "Melancholic",
        unique_moodCOLOR: "#707070",
        unique_moodCODE: null,
        createdAt: '1899-11-30 00:00:00',
        updatedAt: '1899-11-30 00:00:00',
        unique_moodICON: 'melancholic.svg',
        unique_moodCOLOR_APP: "background: transparent linear-gradient(105deg, #FF5D84 0%, #FF8800 100%) 0% 0% no-repeat padding-box;",
      },
      {
        unique_moodTEXT: "Annoyed",
        unique_moodCOLOR: "#343434",
        unique_moodCODE: null,
        createdAt: '1899-11-30 00:00:00',
        updatedAt: '1899-11-30 00:00:00',
        unique_moodICON: 'annoyed.svg',
        unique_moodCOLOR_APP: "background: transparent linear-gradient(105deg, #3C939A 0%, #AABE58 100%) 0% 0% no-repeat padding-box;",
      },
      {
        unique_moodTEXT: "Excited",
        unique_moodCOLOR: "#9E30FF",
        unique_moodCODE: null,
        createdAt: '1899-11-30 00:00:00',
        updatedAt: '1899-11-30 00:00:00',
        unique_moodICON: 'excited.svg',
        unique_moodCOLOR_APP: "background: transparent linear-gradient(105deg, #FF002B 0%, #7F0202 100%) 0% 0% no-repeat padding-box;",
      },
      {
        unique_moodTEXT: "Euphoric",
        unique_moodCOLOR: "#FF00C4",
        unique_moodCODE: null,
        createdAt: '1899-11-30 00:00:00',
        updatedAt: '1899-11-30 00:00:00',
        unique_moodICON: 'euphoric.svg',
        unique_moodCOLOR_APP: "background: transparent linear-gradient(105deg, #FF002B 0%, #7F0202 100%) 0% 0% no-repeat padding-box;",
      },
      {
        unique_moodTEXT: "Helpless",
        unique_moodCOLOR: "#7D7996",
        unique_moodCODE: null,
        createdAt: '1899-11-30 00:00:00',
        updatedAt: '1899-11-30 00:00:00',
        unique_moodICON: 'helpless.svg',
        unique_moodCOLOR_APP: "background: transparent linear-gradient(105deg, #FF002B 0%, #7F0202 100%) 0% 0% no-repeat padding-box;",
      },
      {
        unique_moodTEXT: "Happy",
        unique_moodCOLOR: "#FF00C4",
        unique_moodCODE: null,
        createdAt: '1899-11-30 00:00:00',
        updatedAt: '1899-11-30 00:00:00',
        unique_moodICON: 'happy.svg',
        unique_moodCOLOR_APP: "background: transparent linear-gradient(105deg, #FF002B 0%, #7F0202 100%) 0% 0% no-repeat padding-box;",
      },
      {
        unique_moodTEXT: "Obnoxius",
        unique_moodCOLOR: "#7D7996",
        unique_moodCODE: null,
        createdAt: '1899-11-30 00:00:00',
        updatedAt: '1899-11-30 00:00:00',
        unique_moodICON: 'obnoxious.svg',
        unique_moodCOLOR_APP: "background: transparent linear-gradient(105deg, #FF002B 0%, #7F0202 100%) 0% 0% no-repeat padding-box;",
      },
      {
        unique_moodTEXT: "No mood",
        unique_moodCOLOR: "#7D7996",
        unique_moodCODE: null,
        createdAt: '1899-11-30 00:00:00',
        updatedAt: '1899-11-30 00:00:00',
        unique_moodICON: 'no_mood.svg',
        unique_moodCOLOR_APP: "background: transparent linear-gradient(105deg, #FF002B 0%, #7F0202 100%) 0% 0% no-repeat padding-box;",
      },
    ], {});
    },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('unique_moods', null, {});
    
  }
};
