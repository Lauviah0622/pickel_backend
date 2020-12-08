const jwt = require("jsonwebtoken");
const { Event } = require("../models");
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

function createJwtToken (id, status) {
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

      const json = { 
        event: event.dataValues,
        token: createJwtToken(event.dataValues.id, "launcher")
      };
      sendRes(res, true, json);
    } catch (err) {
      console.log(err.errors);
    }
  },
  getEvent: async (req, res) => {
    try {
      const eventSuffix = req.params.suffix;
      const event = await Event.findOne({ where: { eventSuffix } });

      const json = { 
        event: event.dataValues,
        token: createJwtToken(event.dataValues.id, "launcher")
      };

      sendRes(res, true, json)

    } catch (err) {
      console.log(err);
    }
  },
};

module.exports = eventController;
