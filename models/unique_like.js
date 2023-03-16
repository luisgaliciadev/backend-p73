'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class unique_like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      unique_like.belongsTo(models.unique, {
        foreignKey: 'uniqueID',
        targetKey: 'id'
      });
    }
  }
  unique_like.init({
    unique_likeSTATUS: DataTypes.BOOLEAN,
    uniqueID: DataTypes.INTEGER,
    userID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'unique_like',
  });
  return unique_like;
};