'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('category_arts', [
      {
        name: "Abstract",
        createdAt: '1899-11-30 00:00:00',
        updatedAt: '1899-11-30 00:00:00',
      },
      {
        name: "Aerial",
        createdAt: '1899-11-30 00:00:00',
        updatedAt: '1899-11-30 00:00:00',
      },
      {
        name: "Animals",
        createdAt: '1899-11-30 00:00:00',
        updatedAt: '1899-11-30 00:00:00',
      },
      {
        name: "Black and White",
        createdAt: '1899-11-30 00:00:00',
        updatedAt: '1899-11-30 00:00:00',
      },
      {
        name: "Celebrities",
        createdAt: '1899-11-30 00:00:00',
        updatedAt: '1899-11-30 00:00:00',
      },
      {
        name: "City & Architecture",
        createdAt: '1899-11-30 00:00:00',
        updatedAt: '1899-11-30 00:00:00',
      },
      {
        name: "Commercial",
        createdAt: '1899-11-30 00:00:00',
        updatedAt: '1899-11-30 00:00:00',
      },
      {
        name: "Concert",
        createdAt: '1899-11-30 00:00:00',
        updatedAt: '1899-11-30 00:00:00',
      },
      {
        name: "Family",
        createdAt: '1899-11-30 00:00:00',
        updatedAt: '1899-11-30 00:00:00',
      },
      {
        name: "Fashion",
        createdAt: '1899-11-30 00:00:00',
        updatedAt: '1899-11-30 00:00:00',
      },
      {
        name: "Food",
        createdAt: '1899-11-30 00:00:00',
        updatedAt: '1899-11-30 00:00:00',
      },
      {
        name: "Fine Art",
        createdAt: '1899-11-30 00:00:00',
        updatedAt: '1899-11-30 00:00:00',
      },
      {
        name: "Film",
        createdAt: '1899-11-30 00:00:00',
        updatedAt: '1899-11-30 00:00:00',
      },
      {
        name: "Journalism",
        createdAt: '1899-11-30 00:00:00',
        updatedAt: '1899-11-30 00:00:00',
      },
      {
        name: "Landscapes",
        createdAt: '1899-11-30 00:00:00',
        updatedAt: '1899-11-30 00:00:00',
      },
      {
        name: "Macro",
        createdAt: '1899-11-30 00:00:00',
        updatedAt: '1899-11-30 00:00:00',
      },
      {
        name: "Nature",
        createdAt: '1899-11-30 00:00:00',
        updatedAt: '1899-11-30 00:00:00',
      },
      {
        name: "Performing Arts",
        createdAt: '1899-11-30 00:00:00',
        updatedAt: '1899-11-30 00:00:00',
      },
      {
        name: "Sport",
        createdAt: '1899-11-30 00:00:00',
        updatedAt: '1899-11-30 00:00:00',
      },
      {
        name: "Still Life",
        createdAt: '1899-11-30 00:00:00',
        updatedAt: '1899-11-30 00:00:00',
      },
      {
        name: "Street",
        createdAt: '1899-11-30 00:00:00',
        updatedAt: '1899-11-30 00:00:00',
      },
      {
        name: "Transportation",
        createdAt: '1899-11-30 00:00:00',
        updatedAt: '1899-11-30 00:00:00',
      },
      {
        name: "Travel",
        createdAt: '1899-11-30 00:00:00',
        updatedAt: '1899-11-30 00:00:00',
      },
      {
        name: "Underwater",
        createdAt: '1899-11-30 00:00:00',
        updatedAt: '1899-11-30 00:00:00',
      },
      {
        name: "Urban Exploration",
        createdAt: '1899-11-30 00:00:00',
        updatedAt: '1899-11-30 00:00:00',
      },
      {
        name: "Wedding",
        createdAt: '1899-11-30 00:00:00',
        updatedAt: '1899-11-30 00:00:00',
      },
      {
        name: "Uncategorized",
        createdAt: '1899-11-30 00:00:00',
        updatedAt: '1899-11-30 00:00:00',
      },
      {
        name: "My style",
        createdAt: '1899-11-30 00:00:00',
        updatedAt: '1899-11-30 00:00:00',
      },
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
