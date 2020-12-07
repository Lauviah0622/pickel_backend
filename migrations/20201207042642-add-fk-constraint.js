"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.addConstraint("Ranges", {
        fields: ["eventId"],
        type: "foreign key",
        // name: "Ranges_eventId_fk_constraint",
        references: {
          //Required field
          table: "Events",
          field: "id",
        },
        // onDelete: "cascade",
        // onUpdate: "cascade",
      });

      await queryInterface.addConstraint("Picks", {
        fields: ["eventId"],
        type: "foreign key",
        name: "Pick_eventId_fk_constraint",
        references: {
          //Required field
          table: "Events",
          field: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      });

      await queryInterface.addConstraint("Periods", {
        fields: ["pickId"],
        type: "foreign key",
        name: "Period_pickId_fk_constraint",
        references: {
          //Required field
          table: "Picks",
          field: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      });
    } catch (err) {
      console.log(err);
    }

    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down: async (queryInterface, Sequelize) => {
    // await queryInterface.removeConstraint(
    //   "Ranges",
    //   "Ranges_eventId_fk_constraint"
    // );
    // await queryInterface.removeConstraint("Picks", "Pick_eventId_fk_constraint");
    // await queryInterface.removeConstraint(
    //   "Period",
    //   "Period_pickId_fk_constraint"
    // );
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
