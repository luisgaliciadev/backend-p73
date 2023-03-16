'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class report_problem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  report_problem.init({
    report: DataTypes.STRING,
    userID: DataTypes.INTEGER,
    elementID: DataTypes.INTEGER,
    reportTOPIC: DataTypes.ENUM("OTHER","UNIQUE","ARTWORK","STORY","PROFILE"),
    status: DataTypes.ENUM("RECEIVED","REVIEW","CLOSED"),
  }, {
    sequelize,
    modelName: 'report_problem',
  });
  return report_problem;
};
