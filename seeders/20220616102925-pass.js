'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('passes', [
      {
        passNAME: "AANG PASS",
        passTYPE: "ELEMENT",
        passAMOUNT: 5,
        passQUANTITY: "5 ELEMENTS",
        passPRICE: 119,
        createdAt: '2021-11-30 00:00:00',
        updatedAt: '2021-11-30 00:00:00',
        passIMG: 'assets/images/pass/aang.png'
      },
      {
        passNAME: "PEACOCK PASS",
        passTYPE: "ART-MOVEMENT",
        passQUANTITY: "23 ART MOVEMENTS",
        passAMOUNT: 23,
        passPRICE: 69,
        createdAt: '2021-11-30 00:00:00',
        updatedAt: '2021-11-30 00:00:00',
        passIMG: 'assets/images/pass/peacock.png'
      },
      {
        passNAME: "HYENA PASS",
        passTYPE: "MOOD",
        passQUANTITY: "11 MOOD",
        passAMOUNT: 11,
        passPRICE:  149,
        createdAt: '2021-11-30 00:00:00',
        updatedAt: '2021-11-30 00:00:00',
        passIMG: 'assets/images/pass/hyene.png'
      },
      {
        passNAME: "EAGLE PASS",
        passTYPE: "ADD-IMG",
        passAMOUNT: 1,
        passQUANTITY: "NO LIMITS",
        passPRICE: 299,
        createdAt: '2021-11-30 00:00:00',
        updatedAt: '2021-11-30 00:00:00',
        passIMG: 'assets/images/pass/eagle.png'
      },
      {
        passNAME: "MOUSE PASS",
        passTYPE: "ITERATION",
        passQUANTITY: "50 ITERATIONS",
        passAMOUNT: 7,
        passPRICE: 999,
        createdAt: '2021-11-30 00:00:00',
        updatedAt: '2021-11-30 00:00:00',
        passIMG: 'assets/images/pass/mouse.png'
      },
      {
        passNAME: "MOLE PASS",
        passTYPE: "QUALITY",
        passQUANTITY: "1 LEVEL",
        passAMOUNT: 4,
        passPRICE: 699,
        createdAt: '2021-11-30 00:00:00',
        updatedAt: '2021-11-30 00:00:00',
        passIMG: 'assets/images/pass/mole.png'
      },
      {
        passNAME: "OWL PASS",
        passTYPE: "VIDEO",
        passAMOUNT: 1,
        passQUANTITY: "NO LIMITS",
        passPRICE: 2990,
        createdAt: '2021-11-30 00:00:00',
        updatedAt: '2021-11-30 00:00:00',
        passIMG: 'assets/images/pass/owl.png'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
