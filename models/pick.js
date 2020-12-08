"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pick extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Pick.belongsTo(models.Event);
      Pick.hasMany(models.Period);
      // define association here
    }
  }
  Pick.init(
    {
      name: DataTypes.STRING,
      eventId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Pick",
    }
  );
  return Pick;
};
