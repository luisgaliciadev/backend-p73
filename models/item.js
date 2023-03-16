'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      item.belongsTo(models.plan,{
        foreignKey: 'planID',
      })
    }
  }
  item.init({
    itemTEXT: DataTypes.STRING,
    planID: DataTypes.INTEGER,
    itemBOLD: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'item',
  });
  return item;
};