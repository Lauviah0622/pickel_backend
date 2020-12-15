const { insertPick, insertEvent, createRelativeDate } = require("./utils");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      const eventId = await insertEvent(
        queryInterface,
        {
          pickStart: createRelativeDate(-3),
          pickEnd: createRelativeDate(-1),
          name: "determined",
          description: `picking time: start before 3 day, expired yesterday
      duration: 1.5hr
      Range: after 5 ~ 7 days 13:00 ~ 18:00
      picks: 4
      `,
          duration: 6,
          launcher: "Tom",
          eventType: "part",
          determineTime: createRelativeDate(5, 14),
        },
        [
          {
            start: createRelativeDate(5, 13),
            end: createRelativeDate(5, 18),
          },
          {
            start: createRelativeDate(6, 13),
            end: createRelativeDate(6, 18),
          },
          {
            start: createRelativeDate(7, 13),
            end: createRelativeDate(7, 18),
          },
        ]
      );

      
     await insertPick(queryInterface, 'Peter', eventId, [
      {
        start: createRelativeDate(5, 13),
        duration: 3,
        priority: 3,
      },
      {
        start: createRelativeDate(5, 16),
        duration: 2,
        priority: 2,
      }
     ])

     await insertPick(queryInterface, 'May', eventId, [
      {
        start: createRelativeDate(5, 13),
        duration: 4,
        priority: 2,
      },
      {
        start: createRelativeDate(6, 17),
        duration: 1,
        priority: 1,
      },
      {
        start: createRelativeDate(7, 16),
        duration: 2,
        priority: 3,
      }
     ])

     await insertPick(queryInterface, 'Jay', eventId, [
      {
        start: createRelativeDate(5, 13),
        duration: 3,
        priority: 3,
      },
      {
        start: createRelativeDate(6, 13),
        duration: 2,
        priority: 2,
      },
      {
        start: createRelativeDate(6, 16),
        duration: 2,
        priority: 1,
      }
     ])

     await insertPick(queryInterface, 'Dan', eventId, [
      {
        start: createRelativeDate(5, 14),
        duration: 2,
        priority: 3,
      }
     ])


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
