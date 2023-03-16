'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class unique_sell extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      unique_sell.hasMany(models.auction_offer, {
           foreignKey: 'unique_sellID',
           targetKey: 'id'
         });
    }
  }
  unique_sell.init({
    unique_sellQUANTITYSALE: DataTypes.FLOAT,
    unique_sellPRICE: DataTypes.FLOAT,
    unique_sellTYPE: DataTypes.ENUM("SALE","AUCTION"),
    unique_sellSTATUS: DataTypes.ENUM("ACTIVE","INACTIVE"),
    uniqueID: DataTypes.INTEGER,
    projectID: DataTypes.INTEGER,
    projectCODE: DataTypes.STRING,
    userID: DataTypes.INTEGER,
    userBUY: DataTypes.INTEGER,
    unique_sellSITUATION: DataTypes.ENUM("FAIL","SUCCESS","WAITING","NO-MET"),
    unique_sellDATEEXPIRE: DataTypes.DATE,
    unique_sellBASEAUCTIONPRICE: DataTypes.FLOAT,
    unique_sellAUCTIONBOOKINGPRICE: DataTypes.FLOAT,
    unique_sellNFT: DataTypes.FLOAT,
    auction_offerCOUNT: {
      type: DataTypes.VIRTUAL,
      get() {
        if (!this.auction_offers) {
          return 0;
        } else {
          return this.auction_offers.length;
        }
      },
    },
  }, {
    sequelize,
    modelName: 'unique_sell',
  });
  return unique_sell;
};