const jwt = require("jsonwebtoken");

/**
 * if ok === true, payload is json data, else is error message
 * @param {Res()} res - Respinse object, from callback
 * @param {Boolean} ok - response, ok value
 * @param {*} payload - carry data
 */
function sendRes(res, ok, payload) {
  if (ok) {
    res.send({
      ok: true,
      data: payload,
    });
    res.end();
  } else {
    res.status(400).send({
      ok: false,
      message: payload,
    });
  }
}

function createSendError(message) {
  const err = Error(message);
  err.send = true;
  return err;
}

function createJWTToken(id, status) {
  const VALID_TIME = 60 * 60;
  return jwt.sign(
    {
      id,
      status,
      exp: Math.floor(Date.now() / 1000) + VALID_TIME,
    },
    process.env.SIGNATURE
  );
}

function getEventState(event) {
  switch (true) {
    case event.determineTime instanceof Date:
      return "determined";
    case event.pickEnd < Date.now():
      return "endPicking";
    case event.pickEnd > Date.now() && event.pickStart < Date.now():
      return "picking";
    case event.pickStart > Date.now():
      return "setting";
    default:
      return "inavid Event"
  }
}

module.exports = {
  sendRes,
  createSendError,
  createJWTToken,
  getEventState,
};
