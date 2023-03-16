'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class promtp_used extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  promtp_used.init({
    firstName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'promtp_used',
  });
  return promtp_used;
};