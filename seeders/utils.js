const dayjs = require("dayjs");

/**
 * @typedef Period
 * @type {object}
 * @property {string} description
 * @property {Date} start - date crate by createDateByOffset
 * @property {Date} end - date crate by createDateByOffset
 * @property {(1|2|3)} priority - only [1, 2, 3]，number bigger, piority higher
 */

/**
 * @param {number} dayOffset - setDay use .add(dayOffset, "day")
 * @param {number=} hour - set hour use datjs().hour(), only 0-23
 * @return {Date} params
 */
function createRelativeDate(dayOffset, hour) {
  if (hour) return dayjs().add(dayOffset, "day").hour(hour).toDate();
  return dayjs().add(dayOffset, "day").toDate();
}

const formatDate = (date) => dayjs(date).format("M/DD HH:mm");
/**
 * @param {{}} queryInterface queryInterface Object from .up
 * @param {string} pickerName
 * @param {number} pickId
 * @param {Period[]} periods
 */
async function insertPick(queryInterface, pickerName, eventId, periods) {
  const pickId = await queryInterface.bulkInsert(
    "Picks",
    [
      {
        name: pickerName,
        eventId: eventId,
      },
    ],
    {}
  );
  periods = periods.map((period) => ({
    ...period,
    pickId,
    description: `${pickerName}: ${formatDate(period.start)}-${formatDate(
      period.end
    )}, priority: ${period.priority}}`,
  }));
  await queryInterface.bulkInsert("Periods", periods, {});
}

/**
 *
 * @typedef Event
 * @type {object}
 * @property {Date} pickStart
 * @property {Date} pickEnd
 * @property {string} name
 * @property {?string} description
 * @property {number} duration
 * @property {string} launcher - date crate by createDateByOffset
 * @property {('allday'|'part')} eventType
 * @property {Date} eventSuffix
 * @property {Date} pickSuffix
 * @property {?Date} determineTime
 *
 * @typedef Range
 * @type {object}
 * @property {number} eventId
 * @property {Date} start
 * @property {Date} end
 */

/**
 *
 * @param {{}} queryInterface
 * @param {Event} event
 * @param {Range[]} ranges
 * @return {number} insert event id
 */
async function insertEvent(queryInterface, event, ranges) {
  const eventId = await queryInterface.bulkInsert(
    "Events",
    [{ ...event, eventSuffix: event.name, pickSuffix: event.name }],
    {}
  );
  ranges = ranges.map((range) => ({
    ...range,
    eventId,
  }));
  await queryInterface.bulkInsert("Ranges", ranges, {});
  return eventId;
}

module.exports = {
  insertPick,
  insertEvent,
  createRelativeDate,
  up: () => Promise.resolve(),
  down: () => Promise.resolve(),
};
