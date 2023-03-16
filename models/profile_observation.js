'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class profile_observation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      this.belongsTo(models.profile, {
        foreignKey: 'profileID',
        targetKey: 'id'
      });

    }
  }
  profile_observation.init({
    profile_observationSTATUS: DataTypes.BOOLEAN,
    profileID: DataTypes.INTEGER,
    userID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'profile_observation',
  });
  return profile_observation;
};