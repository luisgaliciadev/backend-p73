'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class unique_token_offer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.unique, {
        foreignKey: 'uniqueID',
        targetKey: 'id'
      });
    }
  }
  unique_token_offer.init({
    unique_token_offerAMMOUNT: DataTypes.FLOAT,
    unique_token_offerDATEEND: DataTypes.DATE,
    unique_token_offerSTATUS: DataTypes.ENUM("SUCCESS","PENDING","FAILED","REFUSED"),
    unique_token_offerTRANSACTIONCODE: DataTypes.STRING,
    uniqueID: DataTypes.INTEGER,
    unique_token_offerQUANTITYTOKEN: DataTypes.INTEGER,
    userOWNER: DataTypes.INTEGER,
    userBUY: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'unique_token_offer',
  });
  return unique_token_offer;
};