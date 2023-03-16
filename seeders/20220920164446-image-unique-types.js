'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     await queryInterface.bulkInsert('image_unique_types', [{
         description: 'unique',
         createdAt: '1899-11-30 00:00:00',
         updatedAt: '1899-11-30 00:00:00'

       },
       {
        description: 'artwork',
        createdAt: '1899-11-30 00:00:00',
        updatedAt: '1899-11-30 00:00:00'
      },
      {
        description: 'draft',
        createdAt: '1899-11-30 00:00:00',
        updatedAt: '1899-11-30 00:00:00'
      }], {});
  },

  async down (queryInterface, Sequelize) {
   
      await queryInterface.bulkDelete('image_unique_types', null, {});
     
  }
};
