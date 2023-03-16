'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class story extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      story.belongsTo(models.story_file_type, {
        foreignKey: 'typeFileID',
        targetKey: 'id'
      });

      story.belongsTo(models.profile, {
        foreignKey: 'userID',
        targetKey: 'userID'
      });
    }
  }
  story.init({
    linkTEXT: {
      allowNull: true,
      type: DataTypes.STRING
    },
    file: {
      type: DataTypes.STRING
    },
    link: DataTypes.STRING,
    typeFileID: DataTypes.INTEGER,
    userID: DataTypes.INTEGER,
    dateExp: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'story',
  });
  return story;
};