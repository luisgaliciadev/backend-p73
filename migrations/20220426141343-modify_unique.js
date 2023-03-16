'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('uniques', 'unique_art_moventID', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'unique_art_movents',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    await queryInterface.changeColumn('uniques', 'unique_moodID', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'unique_moods',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    await queryInterface.changeColumn('uniques', 'unique_elementID', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'unique_elements',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
