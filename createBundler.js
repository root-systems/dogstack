const is = require('ramda/src/is')
const UifyServer = require('uify-server')
const pump = require('pump')

const isString = is(String)

module.exports = createBundler

// wrap uify-server to be compatible with
// express middleware and next(err)
//
// TODO maybe this should be `express-uify`?
// or maybe `uify-server` shouldn't expect `http-sender`
function createBundler (options) {
  const uifyServer = UifyServer(options)

  return (req, res, next) => {
    uifyServer(req, res, {}, finalHandler)

    function finalHandler (err, value) {
      if (err) next(err)
      else valueHandler(req, res, next, value)
    }
  }

  function valueHandler (req, res, next, value) {
    if (isString(value) || Buffer.isBuffer(value)) {
      res.send(value)
    } else {
      // is stream
      pump(value, res, err => {
        if (err) next(err)
      })
    }
  }
}

