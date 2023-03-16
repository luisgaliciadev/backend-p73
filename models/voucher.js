'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class voucher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.voucher_image)
    }
  }
  voucher.init({
    voucherTITLE: DataTypes.STRING,
    uniqueID: DataTypes.INTEGER,
    userID: DataTypes.INTEGER,
    voucherPRICE: DataTypes.FLOAT,
    voucherQR: DataTypes.STRING,
    voucherIMG: DataTypes.STRING,
    voucherDESCRIPTION: DataTypes.TEXT,
    voucherDATESTART: DataTypes.DATE,
    voucherDATEENDING: DataTypes.DATE,
    voucherCOLLETIONMETHOD: DataTypes.STRING,
    voucherSTATUS: DataTypes.ENUM("UNUSED","USED","SALE","DISABLED")
  }, {
    sequelize,
    modelName: 'voucher',
  });
  return voucher;
};