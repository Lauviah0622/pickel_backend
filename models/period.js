'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Period extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Period.belongsTo(models.Event)
      // define association here
    }
  };
  Period.init({
    name: DataTypes.STRING,
    pickId: DataTypes.INTEGER,
    start: DataTypes.DATE,
    end: DataTypes.DATE,
    priority: DataTypes.ENUM('1', '2', '3')
  }, {
    sequelize,
    modelName: 'Period',
  });
  return Period;
};