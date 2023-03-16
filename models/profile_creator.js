'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class profile_creator extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  profile_creator.init({
    profile_creatorIMG: DataTypes.STRING,
    profile_creatorDESCRIPTION: DataTypes.TEXT,
    userID: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'profile_creator',
  });
  return profile_creator;
};