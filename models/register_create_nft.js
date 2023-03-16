'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class register_create_nft extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  register_create_nft.init({
    userID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'register_create_nft',
  });
  return register_create_nft;
};