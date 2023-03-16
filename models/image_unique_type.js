'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class image_unique_type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      image_unique_type.hasMany(models.unique, {
        foreignKey: 'idImageUniqueType'
      });
    }
  }
  image_unique_type.init({
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'image_unique_type',
  });
  return image_unique_type;
};