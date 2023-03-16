'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class my_token extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      my_token.belongsTo(models.unique, {
        foreignKey: 'uniqueID',
        targetKey: 'id'
      });

      my_token.belongsTo(models.profile, {
        foreignKey: 'userID',
        targetKey: 'userID'
      });

      my_token.belongsTo(models.unique_sell, {
        foreignKey: 'uniqueID',
        targetKey: 'uniqueID'
      });
    }
  }
  my_token.init({
    userID: DataTypes.INTEGER,
    uniqueID: DataTypes.INTEGER,
    projectID: DataTypes.INTEGER,
    projectCODE: DataTypes.STRING,
    mytokenSITUATION: DataTypes.ENUM("PRIVATE","SALE","AUCTION","PUBLIC"),
    mytokenQUANTITYAVAIBLE: DataTypes.INTEGER,
    mytokenQUANTITYBUY: DataTypes.INTEGER,
    mytokenPRICEBUY: DataTypes.FLOAT,
  }, {
    sequelize,
    modelName: 'my_token',
  });
  return my_token;
};