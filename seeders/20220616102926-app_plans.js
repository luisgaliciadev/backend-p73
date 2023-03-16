'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('app_plans', [
      {
        name: "Free",
        basic: 10,
        modeBasic: "DAY",
        tokens: 0,
        artworks: 1,
        modeArtworks: "MONTH",
        uniques: 0,
        drafts: 999999999,
        discount: 0,
        price: 0,
        algorithm: "73 DIFFUSION",
        startingImageInfluence: "-",
        iteration73Diffusion: 50,
        aspectRatio: "1:1",
        createdAt: '1899-11-30 00:00:00',
        updatedAt: '1899-11-30 00:00:00',
      },
      {
        name: "UP",
        basic: 35,
        modeBasic: "DAY",
        tokens: 60,
        artworks: 3,
        modeArtworks: "MONTH",
        uniques: 1,
        drafts: 999999999,
        discount: 5,
        price: 19.90,
        algorithm: "73 DIFFUSION + CAMY",
        art_movementPass: "PEACOCK PASS",
        art_movementPassID: 2,
        art_movementPassQuantity:2,
        moodPass: "HYENA PASS",
        moodPassID: 3,
        moodPassQuantity: 1,
        startingImageInfluence: "-",
        iteration73Diffusion: 50,
        iterationCamy: 150,
        aspectRatio: "ALL",
        createdAt: '1899-11-30 00:00:00',
        updatedAt: '1899-11-30 00:00:00',
      },
      {
        name: "VIP",
        basic: 70,
        modeBasic: "DAY",
        tokens: 150,
        artworks: 5,
        modeArtworks: "MONTH",
        uniques: 3,
        drafts: 999999999,
        discount: 10,
        price: 34.90,
        algorithm: "73 DIFFUSION + CAMY",
        elementPass: "AANG PASS",
        elementPassID: 1,
        elementPassQuantity: 1,
        art_movementPass: "PEACOCK PASS",
        art_movementPassID: 2,
        art_movementPassQuantity:4,
        moodPass: "HYENA PASS",
        moodPassID: 3,
        moodPassQuantity: 2,
        startingImageInfluence: "up to 85%",
        iteration73Diffusion: 100,
        iterationCamy: 350,
        aspectRatio: "ALL",
        createdAt: '1899-11-30 00:00:00',
        updatedAt: '1899-11-30 00:00:00',
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
