'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class story_file_type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      story_file_type.hasMany(models.story, {
        foreignKey: 'typeFileID'
      });
    }
  }
  story_file_type.init({
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'story_file_type',
  });
  return story_file_type;
};