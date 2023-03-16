'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class unique_available extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  unique_available.init({
    unique_availableQUANTITY: DataTypes.INTEGER,
    unique_availableDATEUNTIL: DataTypes.INTEGER,
    userID: DataTypes.INTEGER,
    createdAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'unique_available',
  });
  return unique_available;
};