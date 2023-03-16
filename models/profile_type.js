'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class profile_type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      profile_type.hasMany(models.profile, {
        foreignKey: 'idProfileType'
      });
    }
  }
  profile_type.init({
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      notNull: true,
      notEmpty: true
    }, 
    description: {
      type: DataTypes.STRING
    }, 
    languageID: {
      type: DataTypes.INTEGER
    }, 
    profileID: {
      type: DataTypes.INTEGER
    } 
  }, {
    sequelize,
    modelName: 'profile_type',
  });
  return profile_type;
};