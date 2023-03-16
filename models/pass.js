'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pass extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  pass.init({
    passNAME: DataTypes.STRING,
    passTYPE: DataTypes.ENUM("MOOD","ELEMENT","ART-MOVEMENT","ADD-IMG","ITERATION","QUALITY","VIDEO"),
    passAMOUNT: DataTypes.STRING,
    passPRICE: DataTypes.FLOAT,
    passQUANTITY: DataTypes.STRING,
    passIMG: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'pass',
  });
  return pass;
};