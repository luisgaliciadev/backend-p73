'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('algorithm_requests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      algorithm_requestSTATUS: {
        type: Sequelize.ENUM("EXECUTED","NOT-EXECUTED"),
        defaultValue: "NOT-EXECUTED"
      },
      algorithm_requestASPECTRATIO: {
        type: Sequelize.STRING
      },
      algorithm_requestLUCKYNUMBER: {
        type: Sequelize.INTEGER
      },
      algorithm_requestINTERACTIONS: {
        type: Sequelize.INTEGER
      },
      algorithm_requestDIMENSIONS: {
        type: Sequelize.STRING
      },
      algorithm_requestDATEEXECUTED: {
        type: Sequelize.DATE
      },
      userID: {
        type: Sequelize.INTEGER
      },
      algorithm_requestIMAGESTARTING: {
        type: Sequelize.STRING
      },
      promtpID: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      unique_elementID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'unique_elements',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      unique_art_moventID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'unique_art_movents',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      unique_moodID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'unique_moods',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('algorithm_requests');
  }
};