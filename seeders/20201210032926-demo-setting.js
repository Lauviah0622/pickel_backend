const { insertPick, insertEvent, createRelativeDate } = require("./utils");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      const eventId = await insertEvent(
        queryInterface,
        {
          pickStart: createRelativeDate(1),
          pickEnd: createRelativeDate(3),
          name: "setting",
          description: `picking time: start tomorrow, expired after 3 days
      duration: 2hr
      Range: after 7 ~ 9 days 13:00 ~ 18:00
      picks: 0
      `,
          duration: 8,
          launcher: "Tom",
          eventType: "part",
          determineTime: null,
        },
        [
          {
            start: createRelativeDate(7, 13),
            end: createRelativeDate(7, 18),
          },
          {
            start: createRelativeDate(8, 13),
            end: createRelativeDate(8, 18),
          },
          {
            start: createRelativeDate(9, 13),
            end: createRelativeDate(9, 18),
          },
        ]
      );


    } catch (err) {
      console.log(err);
    }
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Events", null, {});
  },
};
