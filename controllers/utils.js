/**
 * if ok === true, payload is json data, else is error message
 * @param {Res()} res - Respinse object, from callback
 * @param {Boolean} ok - response, ok value
 * @param {*} payload - carry data
 */
function sendRes (res, ok, payload) {
    if (ok) {
        res.send({
            ok: true,
            data: payload
        })
        res.end()
        
    } else {
        res.status(400).send({
            ok: false,
            message: payload
        })
    }
}

module.exports = {
    sendRes
}