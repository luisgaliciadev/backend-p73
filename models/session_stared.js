'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class session_stared extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  session_stared.init({
    userID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'session_stared',
  });
  return session_stared;
};