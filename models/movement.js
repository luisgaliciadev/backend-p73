'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class movement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  movement.init({
    movementAmount: DataTypes.DECIMAL,
    balanceID: DataTypes.INTEGER,
    movementTYPE: DataTypes.ENUM('RECHARGE','WITHDRAWAL')
  }, {
    sequelize,
    modelName: 'movement',
  });
  return movement;
};