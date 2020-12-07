"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    queryInterface.addConstraint("Events", {
      fields: ["eventSuffix"],
      type: "unique",
      name: "Evetns_eventSuffix_unique",
    });
    queryInterface.addConstraint("Events", {
      fields: ["pickSuffix"],
      type: "unique",
      name: "Evetns_pickSuffix_unique",
    });
    queryInterface.addConstraint("Events", {
      fields: ["pickSuffix"],
      type: "check",
      name: "Evetns_pickSuffix_unique",
      where: {
        eventSuffix: {
          [Sequelize.Op.ne]: Sequelize.col("pickSuffix"),
        },
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
