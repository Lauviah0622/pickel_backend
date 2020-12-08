const omit = require("lodash/omit");
const jwt = require("jsonwebtoken");
const { Event, Range } = require("../models");
const { sendRes } = require("./utils");

/**
 * getSuffixes
 * @returns {[string, string]} two token by timestamp
 *
 */
function getSuffixes() {
  const ALPHA = "AIRMBPQNKF34SZ2C0ED8X5WU76LHGT9YOVJ1";
  const BETA = "15f4qa76lzhx0i89oumbgjcedrn2tpsvwky3";
  function encode(timestamp) {
    let num = timestamp;
    const result = ["", ""];
    let mod;
    do {
      mod = (num % ALPHA.length) - 1;
      result[0] = ALPHA.charAt(mod) + result[0];
      result[1] = BETA.charAt(mod) + result[1];
      num = Math.floor(num / 64);
    } while (num > 0);
    //  console.log('result', result);
    return result;
  }
  let suffixes = encode(new Date().getTime());
  while (suffixes[0] === suffixes[1]) {
    suffixes = encode(new Date().getTime());
  }
  return suffixes;
}

function createJwtToken(id, status) {
  return jwt.sign(
    {
      id,
      status,
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
    },
    process.env.SIGNATURE
  );
}

const eventController = {
  createEvent: async (req, res) => {
    try {
      const [eventSuffix, pickSuffix] = getSuffixes();
      const event = await Event.create(
        {
          pickStart: req.body.pickStart,
          pickEnd: req.body.pickEnd,
          name: req.body.name,
          description: req.body.description,
          duration: req.body.duration,
          launcher: req.body.launcher,
          eventType: req.body.eventType,
          eventSuffix,
          pickSuffix,
        },
        { returning: true }
      );

      const ranges = await Promise.all(
        req.body.ranges.map((range) => {
          return Range.create({
            eventId: event.dataValues.id,
            start: range.start,
            end: range.end,
          });
        })
      );
      const eventData = omit(event.dataValues, ["createdAt", "updatedAt"]);
      eventData.ranges = ranges.map((range) => ({start: range.start, end: range.end}));

      const json = {
        event: eventData,
        token: createJwtToken(event.dataValues.id, "launcher"),
      };

      sendRes(res, true, json);
    } catch (err) {
      sendRes(res, false, err.errors);

      console.log(err.errors);
    }
  },
  getEvent: async (req, res) => {
    try {
      const eventSuffix = req.params.suffix;
      const event = await Event.findOne({
        where: { eventSuffix },
        include: [{model: Range, as: 'ranges'}],
      });
      if (!event) throw Error("no event form suffix");
      const resEventData = omit(event.dataValues, ["createdAt", "updatedAt"]);
      resEventData.ranges = resEventData.ranges.map((range) => ({
        start: range.start,
        end: range.end,
      }));
      const json = {
        event: resEventData,
        token: createJwtToken(event.dataValues.id, "launcher"),
      };

      sendRes(res, true, json);
    } catch (err) {
      sendRes(res, false, err.message);
      console.log(err);
    }
  },
  updateEvent: async (req, res) => {
    try {
      const token = req.get("Authorization").split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.SIGNATURE);
      if (!decodedToken) throw Error("invalid token");
      if (decodedToken.status !== "launcher")
        throw Error("incompatible status");

      const eventSuffix = req.params.suffix;
      const event = await Event.findOne({ where: { eventSuffix } });
      if (!event) throw Error("no event form suffix");

      if (decodedToken.id !== event.dataValues.id)
        throw Error("incompatible id");

      const updatedEvent = await event.update({ ...req.body });
      const json = {
        event: updatedEvent.dataValues,
      };

      sendRes(res, true, json);
    } catch (err) {
      sendRes(res, false, err.message);
    }
  },
};

module.exports = eventController;
