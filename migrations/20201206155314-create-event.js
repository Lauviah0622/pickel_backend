'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pickStart: {
        type: Sequelize.TIME
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: ''
      },
      description: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      duration: {
        allowNull: false,        
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
      launcher: {
        type: Sequelize.STRING
      },
      eventType: {
        type: Sequelize.ENUM('part', 'allday'),
        defaultValue: 'part'
      },
      eventSuffix: {
        type: Sequelize.STRING
      },
      pickSuffix: {
        type: Sequelize.STRING
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
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Events');
  }
};