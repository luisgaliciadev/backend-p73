'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_pass_art_movement_use extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.unique_art_movent, {
        foreignKey: 'art_movementID',
        targetKey: 'id'
      });
    }
  }
  user_pass_art_movement_use.init({
    passID: DataTypes.INTEGER,
    userID: DataTypes.INTEGER,
    art_movementID: DataTypes.INTEGER,
    user_pass_art_movement_useDATEUNTIL : DataTypes.DATE,
    user_pass_art_movement_useSTATUS: DataTypes.ENUM("ACTIVE","INACTIVE"),
    user_pass_art_movement_useFREEPLAN: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'user_pass_art_movement_use',
  });
  return user_pass_art_movement_use;
};