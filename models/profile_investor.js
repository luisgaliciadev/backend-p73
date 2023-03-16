'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class profile_investor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  profile_investor.init({
    profile_investorIMG: DataTypes.STRING,
    profile_investorDESCRIPTION: DataTypes.TEXT,
    userID: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'profile_investor',
  });
  return profile_investor;
};