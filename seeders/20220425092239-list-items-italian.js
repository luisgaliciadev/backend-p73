'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('items', [{
      itemTEXT: '20% Off',
      planID: 7,
      itemBOLD: false,
      createdAt: '1899-11-30 00:00:00',
      updatedAt: '1899-11-30 00:00:00'
    },
    {
      itemTEXT: 'Disponibili per 3 months',
      planID: 7,
      itemBOLD: false,
      createdAt: '1899-11-30 00:00:00',
      updatedAt: '1899-11-30 00:00:00'
    },
    {
      itemTEXT: 'Negoziabili in Exchange',
      planID: 7,
      itemBOLD: false,
      createdAt: '1899-11-30 00:00:00',
      updatedAt: '1899-11-30 00:00:00'
    },
    {
      itemTEXT: 'Esclusivi e certificati',
      planID: 7,
      itemBOLD: false,
      createdAt: '1899-11-30 00:00:00',
      updatedAt: '1899-11-30 00:00:00'
    },
    {
      itemTEXT: '30% Off',
      planID: 8,
      itemBOLD: false,
      createdAt: '1899-11-30 00:00:00',
      updatedAt: '1899-11-30 00:00:00'
    },
    {
      itemTEXT: 'Disponibili per 3 months',
      planID: 8,
      itemBOLD: false,
      createdAt: '1899-11-30 00:00:00',
      updatedAt: '1899-11-30 00:00:00'
    },
    {
      itemTEXT: 'Negoziabili in Exchange',
      planID: 8,
      itemBOLD: false,
      createdAt: '1899-11-30 00:00:00',
      updatedAt: '1899-11-30 00:00:00'
    },
    {
      itemTEXT: 'Esclusivi e certificati',
      planID: 8,
      itemBOLD: false,
      createdAt: '1899-11-30 00:00:00',
      updatedAt: '1899-11-30 00:00:00'
    },
    {
      itemTEXT: '50% Off',
      planID: 9,
      itemBOLD: false,
      createdAt: '1899-11-30 00:00:00',
      updatedAt: '1899-11-30 00:00:00'
    },
    {
      itemTEXT: 'Disponibili per 3 months',
      planID: 9,
      itemBOLD: false,
      createdAt: '1899-11-30 00:00:00',
      updatedAt: '1899-11-30 00:00:00'
    },
    {
      itemTEXT: 'Negoziabili in Exchange',
      planID: 9,
      itemBOLD: false,
      createdAt: '1899-11-30 00:00:00',
      updatedAt: '1899-11-30 00:00:00'
    },
    {
      itemTEXT: 'Esclusivi e certificati',
      planID: 9,
      itemBOLD: false,
      createdAt: '1899-11-30 00:00:00',
      updatedAt: '1899-11-30 00:00:00'
    },
    {
      itemTEXT: '10 Artisti patrocinati',
      planID: 10,
      itemBOLD: false,
      createdAt: '1899-11-30 00:00:00',
      updatedAt: '1899-11-30 00:00:00'
    },
    {
      itemTEXT: '100 Unique gift 2D',
      planID: 10,
      itemBOLD: false,
      createdAt: '1899-11-30 00:00:00',
      updatedAt: '1899-11-30 00:00:00'
    },
    {
      itemTEXT: '250 Creative Token',
      planID: 10,
      itemBOLD: false,
      createdAt: '1899-11-30 00:00:00',
      updatedAt: '1899-11-30 00:00:00'
    },
    {
      itemTEXT: 'Acquisti addizionali - 15%',
      planID: 10,
      itemBOLD: false,
      createdAt: '1899-11-30 00:00:00',
      updatedAt: '1899-11-30 00:00:00'
    },
    {
      itemTEXT: 'Acconto immediato 40%',
      planID: 10,
      itemBOLD: true,
      createdAt: '1899-11-30 00:00:00',
      updatedAt: '1899-11-30 00:00:00'
    },
    {
      itemTEXT: '30 Artisti patrocinati',
      planID: 11,
      itemBOLD: false,
      createdAt: '1899-11-30 00:00:00',
      updatedAt: '1899-11-30 00:00:00'
    },
    {
      itemTEXT: '250 Unique gift 2D',
      planID: 11,
      itemBOLD: false,
      createdAt: '1899-11-30 00:00:00',
      updatedAt: '1899-11-30 00:00:00'
    },
    {
      itemTEXT: '500 Creative Token',
      planID: 11,
      itemBOLD: false,
      createdAt: '1899-11-30 00:00:00',
      updatedAt: '1899-11-30 00:00:00'
    },
    {
      itemTEXT: 'Acquisti addizionali - 20%',
      planID: 11,
      itemBOLD: false,
      createdAt: '1899-11-30 00:00:00',
      updatedAt: '1899-11-30 00:00:00'
    },
    {
      itemTEXT: 'Jupiverse area da 25 mq a 100 mq',
      planID: 11,
      itemBOLD: false,
      createdAt: '1899-11-30 00:00:00',
      updatedAt: '1899-11-30 00:00:00'
    },
    {
      itemTEXT: 'Acconto immediato 35%',
      planID: 11,
      itemBOLD: true,
      createdAt: '1899-11-30 00:00:00',
      updatedAt: '1899-11-30 00:00:00'
    },
    {
      itemTEXT: '100 Artisti patrocinati',
      planID: 12,
      itemBOLD: false,
      createdAt: '1899-11-30 00:00:00',
      updatedAt: '1899-11-30 00:00:00'
    },
    {
      itemTEXT: '1000 Unique gift 2D',
      planID: 12,
      itemBOLD: false,
      createdAt: '1899-11-30 00:00:00',
      updatedAt: '1899-11-30 00:00:00'
    },
    {
      itemTEXT: '2000 Creative Token',
      planID: 12,
      itemBOLD: false,
      createdAt: '1899-11-30 00:00:00',
      updatedAt: '1899-11-30 00:00:00'
    },
    {
      itemTEXT: 'Acquisti addizionali - 35%',
      planID: 12,
      itemBOLD: false,
      createdAt: '1899-11-30 00:00:00',
      updatedAt: '1899-11-30 00:00:00'
    },
    {
      itemTEXT: 'Jupiverse area da 100 mq a 500 mq',
      planID: 12,
      itemBOLD: false,
      createdAt: '1899-11-30 00:00:00',
      updatedAt: '1899-11-30 00:00:00'
    },
    {
      itemTEXT: 'Acconto immediato 30%',
      planID: 12,
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
