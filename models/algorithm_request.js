'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class algorithm_request extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      this.belongsTo(models.unique_art_movent, {
        foreignKey: 'unique_art_moventID',
        targetKey: 'id'
      });

      this.belongsTo(models.unique_element, {
        foreignKey: 'unique_elementID',
        targetKey: 'id'
      });

      this.belongsTo(models.unique_mood, {
        foreignKey: 'unique_moodID',
        targetKey: 'id'
      });

      this.belongsTo(models.promtp, {
        foreignKey: 'promtpID',
        targetKey: 'id'
      });

      this.belongsTo(models.profile, {
        foreignKey: 'userID',
        targetKey: 'userID'
      });

      this.belongsTo(models.unique, {
        foreignKey: 'uniqueID',
        targetKey: 'id'
      });

    }
  }
  algorithm_request.init({
    algorithm_requestSTATUS: DataTypes.ENUM("EXECUTED","NOT-EXECUTED"),
    algorithm_requestASPECTRATIO: DataTypes.STRING,
    algorithm_requestLUCKYNUMBER: DataTypes.INTEGER,
    algorithm_requestINTERACTIONS: DataTypes.INTEGER,
    algorithm_requestDIMENSIONS: DataTypes.STRING,
    algorithm_requestPROMTPTEXT: DataTypes.STRING,
    promtpID: DataTypes.INTEGER,
    unique_elementID: DataTypes.INTEGER,
    unique_art_moventID: DataTypes.INTEGER,
    unique_moodID: DataTypes.INTEGER,
    userID: DataTypes.INTEGER,
    algorithm_requestIMAGESTARTING: DataTypes.STRING,
    algorithm_requestDATEEXECUTED: DataTypes.DATE,
    uniqueID: DataTypes.INTEGER,
    algorithm_requestQUALITY: DataTypes.ENUM("DEFAULT","HIGHT","EXCELLENT","SUPREME"),
    algorithm_requestTYPEALGORITHM: DataTypes.ENUM("73D","CAMY"),
    algorithm_requestIMGSTARINGPERCENTAGE: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'algorithm_request',
  });
  return algorithm_request;
};