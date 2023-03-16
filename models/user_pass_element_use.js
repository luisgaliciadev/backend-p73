'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_pass_element_use extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.unique_element, {
        foreignKey: 'elementID',
        targetKey: 'id'
      });
    }
  }
  user_pass_element_use.init({
    passID: DataTypes.INTEGER,
    userID: DataTypes.INTEGER,
    elementID: DataTypes.INTEGER,
    user_pass_element_useDATEUNTIL : DataTypes.DATE,
    user_pass_element_useSTATUS: DataTypes.ENUM("ACTIVE","INACTIVE"),
    user_pass_element_useFREEPLAN: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'user_pass_element_use',
  });
  return user_pass_element_use;
};