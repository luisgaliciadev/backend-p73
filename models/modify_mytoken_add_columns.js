'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class modify_mytoken_add_columns extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  modify_mytoken_add_columns.init({
    mytokenSITUATION: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'modify_mytoken_add_columns',
  });
  return modify_mytoken_add_columns;
};