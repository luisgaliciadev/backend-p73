'use strict';
const {
  Model, INTEGER
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class promtp_available extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  promtp_available.init({
    promtp_availableQUANTITY: DataTypes.INTEGER,
    promtp_availableUNTIL: DataTypes.DATE,
    userID: DataTypes.INTEGER.UNSIGNED
  }, {
    sequelize,
    modelName: 'promtp_available',
  });
  return promtp_available;
};