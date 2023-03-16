'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class unique_art_movent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  unique_art_movent.init({
    unique_art_moventTEXT: DataTypes.STRING,
    unique_art_moventtCOLOR: DataTypes.STRING,
    unique_art_moventCODE: DataTypes.STRING,
    unique_art_moventIMAGE: DataTypes.STRING,
    languageID : DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'unique_art_movent',
  });
  return unique_art_movent;
};