'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class unique_mood extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      /*uniqueMood.hasMany(models.unique,{
        foreignKey: 'unique_moodID'
      })*/
    }
  }
  unique_mood.init({
    unique_moodTEXT: DataTypes.STRING,
    unique_moodCOLOR: DataTypes.STRING,
    unique_moodCODE: DataTypes.STRING,
    languageID : DataTypes.INTEGER,
    unique_moodICON: DataTypes.STRING,
    unique_moodCOLOR_APP: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'unique_mood',
  });
  return unique_mood;
};