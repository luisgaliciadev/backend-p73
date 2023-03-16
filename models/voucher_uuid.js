'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class voucher_uuid extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.voucher, {
        foreignKey: 'voucherID',
        targetKey: 'id'
      });
    }
  }
  voucher_uuid.init({
    voucher_uuidCODE: DataTypes.STRING,
    voucherID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'voucher_uuid',
  });
  return voucher_uuid;
};