'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class unique_element extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      /*uniqueElement.hasMany(models.unique,{
        foreignKey: 'unique_moodID'
      })*/
    }
  }
  unique_element.init({
    unique_elementTEXT: DataTypes.STRING,
    unique_elementCOLOR: DataTypes.STRING,
    unique_elementCODE: DataTypes.STRING,
    languageID : DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'unique_element',
  });
  return unique_element;
};