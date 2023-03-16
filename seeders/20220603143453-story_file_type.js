'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('story_file_types', [
      {
        description: "image",
        createdAt: '1899-11-30 00:00:00',
        updatedAt: '1899-11-30 00:00:00',
      },
      {
        description: "video",
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
