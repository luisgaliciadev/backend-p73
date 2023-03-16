'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('items', [{
      itemTEXT: '20% Off',
      planID: 1,
      itemBOLD: false,
      createdAt: '1899-11-30 00:00:00',
      updatedAt: '1899-11-30 00:00:00'
    },
    {
      itemTEXT: 'Availability 3 months',
      planID: 1,
      itemBOLD: false,
      createdAt: '1899-11-30 00:00:00',
      updatedAt: '1899-11-30 00:00:00'
    },
    {
      itemTEXT: 'Exchange Tradable',
      planID: 1,
      itemBOLD: false,
      createdAt: '1899-11-30 00:00:00',
      updatedAt: '1899-11-30 00:00:00'
    },
    {
      itemTEXT: 'Exclusive and certified',
      planID: 1,
      itemBOLD: false,
      createdAt: '1899-11-30 00:00:00',
      updatedAt: '1899-11-30 00:00:00'
    },
    {
      itemTEXT: '30% Off',
      planID: 2,
      itemBOLD: false,
      createdAt: '1899-11-30 00:00:00',
      updatedAt: '1899-11-30 00:00:00'
    },
    {
      itemTEXT: 'Availability 3 months',
      planID: 2,
      itemBOLD: false,
      createdAt: '1899-11-30 00:00:00',
      updatedAt: '1899-11-30 00:00:00'
    },
    {
      itemTEXT: 'Exchange Tradable',
      planID: 2,
      itemBOLD: false,
      createdAt: '1899-11-30 00:00:00',
      updatedAt: '1899-11-30 00:00:00'
    },
    {
      itemTEXT: 'Exclusive and certified',
      planID: 2,
      itemBOLD: false,
      createdAt: '1899-11-30 00:00:00',
      updatedAt: '1899-11-30 00:00:00'
    },
    {
      itemTEXT: '50% Off',
      planID: 3,
      itemBOLD: false,
      createdAt: '1899-11-30 00:00:00',
      updatedAt: '1899-11-30 00:00:00'
    },
    {
      itemTEXT: 'Availability 3 months',
      planID: 3,
      itemBOLD: false,
      createdAt: '1899-11-30 00:00:00',
      updatedAt: '1899-11-30 00:00:00'
    },
    {
      itemTEXT: 'Exchange Tradable',
      planID: 3,
      itemBOLD: false,
      createdAt: '1899-11-30 00:00:00',
      updatedAt: '1899-11-30 00:00:00'
    },
    {
      itemTEXT: 'Exclusive and certified',
      planID: 3,
      itemBOLD: false,
      createdAt: '1899-11-30 00:00:00',
      updatedAt: '1899-11-30 00:00:00'
    },
    {
      itemTEXT: '10 Creator Patronized',
      planID: 4,
      itemBOLD: false,
      createdAt: '1899-11-30 00:00:00',
      updatedAt: '1899-11-30 00:00:00'
    },
    {
      itemTEXT: '100 unique gift 2D',
      planID: 4,
      itemBOLD: false,
      createdAt: '1899-11-30 00:00:00',
      updatedAt: '1899-11-30 00:00:00'
    },
    {
      itemTEXT: '250 Creative Token',
      planID: 4,
      itemBOLD: false,
      createdAt: '1899-11-30 00:00:00',
      updatedAt: '1899-11-30 00:00:00'
    },
    {
      itemTEXT: 'Additional purcharse - 15%',
      planID: 4,
      itemBOLD: false,
      createdAt: '1899-11-30 00:00:00',
      updatedAt: '1899-11-30 00:00:00'
    },
    {
      itemTEXT: 'Inmediate reservation 40%',
      planID: 4,
      itemBOLD: true,
      createdAt: '1899-11-30 00:00:00',
      updatedAt: '1899-11-30 00:00:00'
    },
    {
      itemTEXT: '30 Creator Patronized',
      planID: 5,
      itemBOLD: false,
      createdAt: '1899-11-30 00:00:00',
      updatedAt: '1899-11-30 00:00:00'
    },
    {
      itemTEXT: '250 unique gift 2D',
      planID: 5,
      itemBOLD: false,
      createdAt: '1899-11-30 00:00:00',
      updatedAt: '1899-11-30 00:00:00'
    },
    {
      itemTEXT: '500 Creative Token',
      planID: 5,
      itemBOLD: false,
      createdAt: '1899-11-30 00:00:00',
      updatedAt: '1899-11-30 00:00:00'
    },
    {
      itemTEXT: 'Additional purcharse - 20%',
      planID: 5,
      itemBOLD: false,
      createdAt: '1899-11-30 00:00:00',
      updatedAt: '1899-11-30 00:00:00'
    },
    {
      itemTEXT: 'Jupiverse area da 25 mq a 100 mq',
      planID: 5,
      itemBOLD: false,
      createdAt: '1899-11-30 00:00:00',
      updatedAt: '1899-11-30 00:00:00'
    },
    {
      itemTEXT: 'Inmediate reservation 35%',
      planID: 5,
      itemBOLD: true,
      createdAt: '1899-11-30 00:00:00',
      updatedAt: '1899-11-30 00:00:00'
    },
    {
      itemTEXT: '100 Creator Patronized',
      planID: 6,
      itemBOLD: false,
      createdAt: '1899-11-30 00:00:00',
      updatedAt: '1899-11-30 00:00:00'
    },
    {
      itemTEXT: '1000 unique gift 2D',
      planID: 6,
      itemBOLD: false,
      createdAt: '1899-11-30 00:00:00',
      updatedAt: '1899-11-30 00:00:00'
    },
    {
      itemTEXT: '2000 Creative Token',
      planID: 6,
      itemBOLD: false,
      createdAt: '1899-11-30 00:00:00',
      updatedAt: '1899-11-30 00:00:00'
    },
    {
      itemTEXT: 'Additional purcharse - 35%',
      planID: 6,
      itemBOLD: false,
      createdAt: '1899-11-30 00:00:00',
      updatedAt: '1899-11-30 00:00:00'
    },
    {
      itemTEXT: 'Jupiverse area da 100 mq a 500 mq',
      planID: 6,
      itemBOLD: false,
      createdAt: '1899-11-30 00:00:00',
      updatedAt: '1899-11-30 00:00:00'
    },
    {
      itemTEXT: 'Inmediate reservation 30%',
      planID: 6,
      itemBOLD: true,
      createdAt: '1899-11-30 00:00:00',
      updatedAt: '1899-11-30 00:00:00'
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
