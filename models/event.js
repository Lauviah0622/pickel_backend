'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Event.hasMany(models.Range, {foreignKey: 'eventId', as: 'ranges'})
      Event.hasMany(models.Pick, {foreignKey: 'eventId', as: 'picks'})
      // define association here
    }
  };
  Event.init({
    pickStart: DataTypes.DATE,
    pickEnd: DataTypes.DATE,
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    duration: DataTypes.INTEGER,
    launcher: DataTypes.STRING,
    eventType: DataTypes.ENUM('part', 'allday'),
    eventSuffix: DataTypes.STRING,
    pickSuffix: DataTypes.STRING,
    determineTime: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};