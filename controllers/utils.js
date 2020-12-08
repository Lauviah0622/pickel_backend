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
  return jwt.sign(
    {
      id,
      status,
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
    },
    process.env.SIGNATURE
  );
}

module.exports = {
  sendRes,
  createSendError,
  createJWTToken
};
