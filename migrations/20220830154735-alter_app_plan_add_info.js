'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('app_plans', 'algorithm', {
      type: Sequelize.ENUM("73 DIFFUSION","CAMY","73 DIFFUSION + CAMY"),
        defaultValue: "73 DIFFUSION",
    });

    await queryInterface.addColumn('app_plans', 'promtp', {
      type: Sequelize.ENUM("YES","NO"),
      defaultValue: "YES",
    });

    await queryInterface.addColumn('app_plans', 'elementPass', {
      type: Sequelize.STRING,
    });

    await queryInterface.addColumn('app_plans', 'elementPassID', {
      type: Sequelize.INTEGER,
      references: {
        model: 'passes',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    await queryInterface.addColumn('app_plans', 'elementPassQuantity', {
      type: Sequelize.INTEGER,
    });

    await queryInterface.addColumn('app_plans', 'art_movementPass', {
      type: Sequelize.STRING,
    });

    await queryInterface.addColumn('app_plans', 'art_movementPassID', {
      type: Sequelize.INTEGER,
      references: {
        model: 'passes',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    await queryInterface.addColumn('app_plans', 'art_movementPassQuantity', {
      type: Sequelize.INTEGER,
    });

    await queryInterface.addColumn('app_plans', 'moodPass', {
      type: Sequelize.STRING,
    });

    await queryInterface.addColumn('app_plans', 'moodPassID', {
      type: Sequelize.INTEGER,
      references: {
        model: 'passes',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });


    await queryInterface.addColumn('app_plans', 'moodPassQuantity', {
      type: Sequelize.INTEGER,
    });

    await queryInterface.addColumn('app_plans', 'startingImage', {
      type: Sequelize.ENUM("YES","NO"),
      defaultValue: "NO",
    });

    await queryInterface.addColumn('app_plans', 'startingImageInfluence', {
      type: Sequelize.STRING
    });

    await queryInterface.addColumn('app_plans', 'iteration73Diffusion', {
      type: Sequelize.STRING
    });

    await queryInterface.addColumn('app_plans', 'iterationCamy', {
      type: Sequelize.STRING
    });

    await queryInterface.addColumn('app_plans', 'aspectRatio', {
      type: Sequelize.STRING
    });

    await queryInterface.addColumn('app_plans', 'generateVideo', {
      type: Sequelize.ENUM("YES","NO"),
      defaultValue: "NO",
    });

    await queryInterface.addColumn('app_plans', 'luckyNumber', {
      type: Sequelize.ENUM("YES","NO"),
      defaultValue: "YES",
    });

    await queryInterface.addColumn('app_plans', 'quality', {
      type: Sequelize.ENUM("DEFAULT","HIGH","SUPREME"),
      defaultValue: "DEFAULT",
    });

  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.removeColumn('app_plans','art_movementPass', {});
     await queryInterface.removeColumn('app_plans','elementPass', {});
     await queryInterface.removeColumn('app_plans','moodPass', {});
     await queryInterface.removeColumn('app_plans','algorithm', {});
     await queryInterface.removeColumn('app_plans','promtp', {});
     await queryInterface.removeColumn('app_plans','elementPassQuantity', {});
     await queryInterface.removeColumn('app_plans','art_movementPassQuantity', {});
     await queryInterface.removeColumn('app_plans','moodPassQuantity', {});
     await queryInterface.removeColumn('app_plans','startingImage', {});
     await queryInterface.removeColumn('app_plans','startingImageInfluence', {});
     await queryInterface.removeColumn('app_plans','iteration73Diffusion', {});
     await queryInterface.removeColumn('app_plans','iterationCamy', {});
     await queryInterface.removeColumn('app_plans','aspectRatio', {});
     await queryInterface.removeColumn('app_plans','generateVideo', {});
     await queryInterface.removeColumn('app_plans','luckyNumber', {});
     await queryInterface.removeColumn('app_plans','quality', {});
     
  }
};
