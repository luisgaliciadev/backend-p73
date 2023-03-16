'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('profile_types', [
      {
        name: "Creatore",
        description: "Scegliete questo tipo di account se volete creare e vendere la vostra arte.",
        languageID: 3,
        profileID: 1,
        createdAt: '1899-11-30 00:00:00',
        updatedAt: '1899-11-30 00:00:00',
      },
      {
        name: "Galleria",
        description: "Scegliete questo tipo di account se volete gestire artisti, aste e mostre d'arte.",
        languageID: 3,
        profileID: 2,
        createdAt: '1899-11-30 00:00:00',
        updatedAt: '1899-11-30 00:00:00',
      },
      {
        name: "Investitore",
        description: "Scegliete questo tipo di conto se desiderate investire in Artisti e Uniques.",
        languageID: 3,
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
