'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      profile.belongsTo(models.profile_type, {
        foreignKey: 'idProfileType',
        targetKey: 'id'
      });
      
      profile.belongsTo(models.app_plan, {
        foreignKey: 'planID',
        targetKey: 'id'
      });

      this.hasMany(models.profile_observation, {
        foreignKey: 'profileID',
        targetKey: 'id'
      });

      profile.belongsTo(models.unique, {
        foreignKey: 'userID',
        targetKey: 'uniqueUSERCREATOR'
      });

      profile.hasMany(models.profile_like);

      this.hasMany(models.user_pass, {
        foreignKey: 'userID',
        targetKey: 'userID'
      });

      this.hasMany(models.user_pass_art_movement_use, {
        foreignKey: 'userID',
        targetKey: 'userID'
      });

      this.hasMany(models.user_pass_element_use, {
        foreignKey: 'userID',
        targetKey: 'userID'
      });

      this.hasMany(models.user_pass_mood_use, {
        foreignKey: 'userID',
        targetKey: 'userID'
      });


    }
  }
  profile.init({
    description: {
      allowNull: true,
      type: DataTypes.STRING(400),
    } ,
    img: DataTypes.STRING,
    userID: {
      allowNull: true,
      type: DataTypes.STRING,
    }, 
    idProfileType: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
    profileUSERNAME: DataTypes.STRING,
    profileBANNER: DataTypes.STRING,
    profileVERIFY: DataTypes.BOOLEAN,
    profileTYPE: DataTypes.ENUM("CREATOR","INVESTOR","GALLERY","CREATOR/INVESTOR"),
    profileNAME: DataTypes.STRING,
    planID: DataTypes.INTEGER,
    planDATEEND: DataTypes.DATE,
    planDATESTART: DataTypes.DATE,
    profileFULLNAME: DataTypes.STRING,
    profileADDRESS: DataTypes.STRING,
    profileBIRTHDATE: DataTypes.DATE,
    profileDOCUMENTIDEN: DataTypes.STRING,
    profileDOCUMENTIDENBACK: DataTypes.STRING,
    profileSTRIPECUSTOMER: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'profile',
  });
  return profile;
};