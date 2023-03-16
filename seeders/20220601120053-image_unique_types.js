"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "image_unique_types",
      [
        {
          description: "unique",
          createdAt: "1899-11-30 00:00:00",
          updatedAt: "1899-11-30 00:00:00",
        },
        {
          description: "artwork",
          createdAt: "1899-11-30 00:00:00",
          updatedAt: "1899-11-30 00:00:00",
        },
        {
          description: "draft",
          createdAt: "1899-11-30 00:00:00",
          updatedAt: "1899-11-30 00:00:00",
        },
        {
          description: "PAY-TO-OWN",
          createdAt: "1899-11-30 00:00:00",
          updatedAt: "1899-11-30 00:00:00",
        },
        {
          description: "NFT",
          createdAt: "1899-11-30 00:00:00",
          updatedAt: "1899-11-30 00:00:00",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
