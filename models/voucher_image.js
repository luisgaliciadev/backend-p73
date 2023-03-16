'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class voucher_image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  voucher_image.init({
    voucherID: DataTypes.INTEGER,
    voucher_imageLINK: DataTypes.TEXT,
    voucher_imageVIEW: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'voucher_image',
  });
  return voucher_image;
};