'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  notification.init({
    notificationTITLE: DataTypes.STRING,
    USERTO: DataTypes.INTEGER,
    USERFROM: DataTypes.INTEGER,
    notificationMESSAGE: DataTypes.STRING,
    notificationMESSAGETWO: DataTypes.STRING,
    notificationLOOP: DataTypes.BOOLEAN,
    notificationVIEW: DataTypes.BOOLEAN,
    notificationNUMBERREPET: DataTypes.INTEGER,
    notificationIMG: DataTypes.STRING,
    notificationIMGTWO: DataTypes.STRING,
    modelID: DataTypes.INTEGER,
    modelTYPE: DataTypes.STRING,
    notificationTYPE: DataTypes.ENUM("ESSENTIAL","PROMOTIONAL","FINANCIAL","SOCIAL"),
    notificationTYPEUSER: DataTypes.ENUM("SELL","BUY"),
    notificationSITUATIONAUCTION: DataTypes.ENUM("NONE","FAIL","SUCCESS","WAITING","NO-MET"),
    notificationSELLTYPE: DataTypes.ENUM("NONE","SELL","AUCTION"),
    notificationCOLORTITLE: DataTypes.STRING,
    notificationCOLORMESSAGE: DataTypes.STRING,
    notificationCOLORMESSAGETWO: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'notification',
  });
  return notification;
};