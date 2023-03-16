'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('profile_types', [
      {
        name: "Creator",
        description: "Choose this type of account if you want to create and sell your art.",
        languageID: 1,
        profileID: 1,
        createdAt: '1899-11-30 00:00:00',
        updatedAt: '1899-11-30 00:00:00',
      },
      {
        name: "Gallery",
        description: "Choose this type of account if you want manage artists, auctions and art exibitions.",
        languageID: 1,
        profileID: 2,
        createdAt: '1899-11-30 00:00:00',
        updatedAt: '1899-11-30 00:00:00',
      },
      {
        name: "Investor",
        description: "Choose this type of account if you want to invest in Artists and Uniques.",
        languageID: 1,
        profileID: 3,
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
