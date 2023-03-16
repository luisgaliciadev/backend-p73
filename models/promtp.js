'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class promtp extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  promtp.init({
    promtpTEXT: {
      allowNull: false,
      type:DataTypes.TEXT,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    walletID: {
      allowNull: true,
      type: DataTypes.INTEGER.UNSIGNED,
      validate: {
        notNull: false,
        notEmpty: false
      }
    },
    userID: {
      allowNull: false,
      type: DataTypes.INTEGER.UNSIGNED,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    promtpSTATUS: DataTypes.ENUM("WITHOUTUSING","USED","DISABLE"),
    promtpsPATERNITYFEED: DataTypes.BOOLEAN,
    promtpsPATERNITYFEEDPERCENTAGE: DataTypes.INTEGER,
    promtpDATEEXPIRE: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'promtp',
  });
  return promtp;
};