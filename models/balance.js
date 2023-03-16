'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class balance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  balance.init({
    balanceAmount: DataTypes.DECIMAL,
    userID: DataTypes.INTEGER.UNSIGNED
  }, {
    sequelize,
    modelName: 'balance',
  });
  return balance;
};