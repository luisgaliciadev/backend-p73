'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class subscription_notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
  }
  subscription_notification.init({
    subscriptionENDPOINT: DataTypes.STRING,
    subscriptionKEY: DataTypes.STRING,
    subscriptionAUTH: DataTypes.STRING,
    subscriptionAPP: DataTypes.STRING,
    userID: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'subscription_notification',
  });
  return subscription_notification;
};