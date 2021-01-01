'use strict';

const {TABLE_CHARSET} = require('../utils');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Picks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      eventId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    },
    TABLE_CHARSET);
    
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Picks');
  }
};