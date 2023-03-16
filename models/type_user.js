'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Type_user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Type_user.hasMany(models.User, {
        foreignKey: 'idTypeUser'
      });
    }
  }
  Type_user.init({
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Type_user',
  });
  return Type_user;
};