'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class nft_debt extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  nft_debt.init({
    nft_debtAMMOUNT: DataTypes.INTEGER,
    nftCONSECUTIVE: DataTypes.INTEGER,
    userID: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'nft_debt',
  });
  return nft_debt;
};