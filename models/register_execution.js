'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class register_execution extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  register_execution.init({
    userID: DataTypes.INTEGER,
    uniqueID: DataTypes.INTEGER,
    register_executionSTATUS: DataTypes.ENUM("SUCCESSFUL","WRONG","PENDING")
  }, {
    sequelize,
    modelName: 'register_execution',
  });
  return register_execution;
};