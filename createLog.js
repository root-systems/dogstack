const Pino = require('pino')
const prettyPino = require('pino-colada')

module.exports = createLog

function createLog (options = {}) {
  const {
    name,
    level = 'info',
    pretty = process.env.NODE_ENV !== 'production',
  } = options

  var stream
  if (pretty) {
    stream = prettyPino()
    stream.pipe(process.stdout)
  }

  return Pino({ name, level }, stream)
}
