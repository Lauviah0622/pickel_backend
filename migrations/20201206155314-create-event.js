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
      
      name: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: ''
      },
      launcher: {
        type: Sequelize.STRING
      },
      description: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      pickStart: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      pickEnd: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      duration: {
        allowNull: false,        
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
      determineTime: {
        type: Sequelize.DATE
      },
      eventType: {
        type: Sequelize.ENUM('part', 'allday'),
        defaultValue: 'part'
      },
      eventSuffix: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      pickSuffix: {
        type: Sequelize.STRING,
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
    });
    

  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Events');
  }
};