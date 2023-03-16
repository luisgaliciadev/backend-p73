'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class app_plan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
    }
  }
  app_plan.init({
    name: DataTypes.STRING,
    basic: DataTypes.INTEGER,
    modeBasic: DataTypes.ENUM("DAY", "MONTH"),
    tokens: DataTypes.INTEGER,
    artworks: DataTypes.INTEGER,
    modeArtworks:DataTypes.ENUM("DAY", "MONTH"),
    uniques: DataTypes.INTEGER,
    drafts: DataTypes.INTEGER,
    discount: DataTypes.INTEGER,
    price:  DataTypes.FLOAT,
    algorithm: DataTypes.ENUM("73 DIFFUSION","CAMY","73 DIFFUSION + CAMY"),
    promtp: DataTypes.ENUM("YES","NO"),
    elementPass: DataTypes.STRING,
    elementPassID: DataTypes.INTEGER,
    elementPassQuantity: DataTypes.INTEGER,
    art_movementPass: DataTypes.STRING,
    art_movementPassID: DataTypes.INTEGER,
    art_movementPassQuantity: DataTypes.INTEGER,
    moodPass: DataTypes.STRING,
    moodPassID: DataTypes.INTEGER,
    moodPassQuantity: DataTypes.INTEGER,
    startingImage: DataTypes.ENUM("YES","NO"),
    startingImageInfluence: DataTypes.STRING,
    iteration73Diffusion: DataTypes.INTEGER,
    iterationCamy: DataTypes.INTEGER,
    aspectRatio: DataTypes.STRING,
    generateVideo: DataTypes.ENUM("YES","NO"),
    luckyNumber: DataTypes.ENUM("YES","NO"),
    quality: DataTypes.ENUM("DEFAULT","HIGH","SUPREME")
  }, {
    sequelize,
    modelName: 'app_plan',
  });
  return app_plan;
};