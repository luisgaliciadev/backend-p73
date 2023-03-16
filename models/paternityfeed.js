'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class paternity_feed extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  paternity_feed.init({
    promtp_fatherID: DataTypes.INTEGER,
    promtp_sonID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'paternity_feed',
  });
  return paternity_feed;
};