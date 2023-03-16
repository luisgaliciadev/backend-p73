'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class unique_download extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  unique_download.init({
    userID: DataTypes.INTEGER,
    uniqueID: DataTypes.INTEGER,
    unique_downloadPRICE: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'unique_download',
  });
  return unique_download;
};