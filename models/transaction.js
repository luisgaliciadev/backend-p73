'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  transaction.init({
    transactionCODE: DataTypes.STRING,
    transactionAMOUNT: DataTypes.FLOAT,
    userTO: DataTypes.INTEGER,
    userFROM: DataTypes.INTEGER,
    uniqueID: DataTypes.INTEGER,
    unique_sellID: DataTypes.INTEGER,
    promtpID: DataTypes.INTEGER,
    transactionAMOUNTTOKEN: DataTypes.INTEGER,
    voucherID: DataTypes.INTEGER,
    transactionOBSERVATION: DataTypes.STRING,
    userID: DataTypes.INTEGER,
    transactionSTATUS: DataTypes.ENUM("COMPLETED","PURCHASED","EXCHANGED","ADDED","PENDING","REFUSED")
  }, {
    sequelize,
    modelName: 'transaction',
  });
  return transaction;
};