'use strict';

const {TABLE_CHARSET} = require('../utils');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Periods', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.TEXT
      },
      pickId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      start: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      duration: {
        allowNull: false,        
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
      priority: {
        type: Sequelize.ENUM('1', '2', '3')
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
    TABLE_CHARSET)
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Periods');
  }
};