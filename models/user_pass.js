'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_pass extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user_pass.init({
    userID: DataTypes.INTEGER,
    user_passINTERATIONQUANTITYMAX73DIFFUSION: DataTypes.INTEGER,
    user_passINTERATIONQUANTITYMAXCAMY: DataTypes.INTEGER,
    user_passQUALITYLEVEL: DataTypes.ENUM("DEFAULT","HIGH","EXCELENT","SUPREME"),
    user_passBALANCEARTMOVEMENT: DataTypes.INTEGER,
    user_passBALANCEMOOD: DataTypes.INTEGER,
    user_passBALANCEELEMENT: DataTypes.INTEGER,
    user_passSTARTINGIMG: DataTypes.BOOLEAN,
    user_passVIDEO: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'user_pass',
  });
  return user_pass;
};