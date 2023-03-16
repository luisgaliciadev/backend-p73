'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class auction_offer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      auction_offer.belongsTo(models.unique_sell, {
        foreignKey: 'unique_sellID',
        targetKey: 'id'
      });
      auction_offer.belongsTo(models.profile, {
        foreignKey: 'userID',
        targetKey: 'userID'
      });
    }
  }
  auction_offer.init({
    auction_offerAMMOUNT: DataTypes.FLOAT,
    auction_offerDATE: DataTypes.DATE,
    userID: DataTypes.INTEGER,
    unique_sellID: DataTypes.INTEGER,
    transactionCODE: DataTypes.STRING,
    auction_offerSTATUS: DataTypes.ENUM("ACTIVE","FAILED","APPROVED","REJECTED"),
  }, {
    sequelize,
    modelName: 'auction_offer',
  });
  return auction_offer;
};