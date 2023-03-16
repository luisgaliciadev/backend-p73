'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class plan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      plan.hasMany(models.item,{
        foreignKey: 'planID',
        targetKey: 'id' 
      }),
      plan.belongsTo(models.language,{
        foreignKey: 'languageID',
      })
    }
  }
  plan.init({
    planTITLE: DataTypes.STRING,
    planCODE: DataTypes.STRING,
    planCOLOR: DataTypes.STRING,
    planFULLPRICE: DataTypes.STRING,
    planDISCOUNTPRICE: DataTypes.STRING,
    planQUANTITYPROMTP: DataTypes.STRING,
    languageID: DataTypes.INTEGER,
    planTYPE: DataTypes.ENUM("ARTIST","GALLERIST")
  }, {
    sequelize,
    modelName: 'plan',
  });
  return plan;
};