'use strict';
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
      end: {
        type: Sequelize.DATE,
        allowNull: false,
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
    });
   
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Periods');
  }
};