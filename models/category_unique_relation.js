'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class category_unique_relation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  category_unique_relation.init({
    categoryID: DataTypes.INTEGER,
    uniqueID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'category_unique_relation',
  });
  return category_unique_relation;
};