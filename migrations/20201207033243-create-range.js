const {TABLE_CHARSET} = require('../utils');

"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Ranges", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      eventId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      start: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      end: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    },
    TABLE_CHARSET);
   
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Ranges");
  },
};
