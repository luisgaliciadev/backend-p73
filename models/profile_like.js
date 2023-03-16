'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class profile_like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      profile_like.belongsTo(models.profile, {
        foreignKey: 'profileID',
        targetKey: 'id'
      });
    }
  }
  profile_like.init({
    profile_likeSTATUS: DataTypes.BOOLEAN,
    profileID: DataTypes.INTEGER,
    userID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'profile_like',
  });
  return profile_like;
};