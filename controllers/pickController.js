const omit = require("lodash/omit");
const pick = require("lodash/pick");
const jwt = require("jsonwebtoken");

const { Event, Pick, Range, sequelize, Period } = require("../models");
const { sendRes, createSendError, createJWTToken } = require("./utils");

const pickController = {
  getPickingEvent: async (req, res) => {
    try {
      const pickSuffix = req.params.suffix;
      const event = await Event.findOne({
        where: { pickSuffix },
        include: [{ model: Range, as: "ranges" }],
      });
      if (!event) throw createSendError("no event from url");
      const resEventData = omit(event.dataValues, [
        "createdAt",
        "updatedAt",
        "eventSuffix",
      ]);
      resEventData.ranges = resEventData.ranges.map((range) => ({
        start: range.start,
        end: range.end,
      }));
      const json = {
        event: resEventData,
        token: createJWTToken(event.dataValues.id, "picker"),
      };

      sendRes(res, true, json);
    } catch (err) {
      sendRes(res, false, err.message);
      console.log(err);
    }
  },
  createPick: async (req, res) => {
    try {
        console.log('123123123');
      const token = req.get("Authorization").split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.SIGNATURE);
      if (!decodedToken) throw createSendError("invalid token");
      if (decodedToken.status !== "picker")
        throw createSendError("incompatible status");

      const pickSuffix = req.params.suffix;

      const pickingEvent = await Event.findOne({
        where: { pickSuffix },
        raw: true,
      });

      if (!pickingEvent) throw createSendError("no event form url");
      if (decodedToken.id !== pickingEvent.id) {
        throw createSendError("incompatible id");
      }
      
      //   return
      const eventId = decodedToken.id;

      const pickData = await sequelize.transaction(async (t) => {
        const { name, periods: reqPeriods } = req.body;
        // console.log(req.body);
        const createdPick = await Pick.create(
          { eventId, name },
          { transaction: t, raw: true }
        );

        const pickId = createdPick.dataValues.id;

        const createdPeriods = await Promise.all(
          reqPeriods.map((period) => {
            return Period.create({ ...period, pickId }, { transaction: t, raw: true });
          })
        );
        // console.log();
        const completePickData = pick(createdPick.dataValues, [
          "eventId",
          "name",
        ]);
        completePickData.periods = createdPeriods.map((period) => {
          return omit(period.dataValues, [
            "createdAt",
            "updatedAt",
            "id",
            "pickId",
          ]);
        });
        // console.log(completePickData);
        return completePickData;
      });
      sendRes(res, true, {
        pick: pickData,
      });
    } catch (err) {
      sendRes(res, false, err.errors);
      console.log(err);
    }
  },
};

module.exports = pickController;
