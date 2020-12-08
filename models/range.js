'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Range extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Range.belongsTo(models.Event, {foreignKey: 'eventId'})

      // define association here
    }
  };
  Range.init({
    eventId: DataTypes.STRING,
    start: DataTypes.DATE,
    end: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Range',
  });
  return Range;
};