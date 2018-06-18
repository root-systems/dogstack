const stringToStream = require('string-to-stream')
const staticModule = require('static-module')
const config = require('../config')
const { PassThrough } = require('stream')

module.exports = Configify

function Configify (filename, options) {
    if (/\.json$/i.test(filename)) return new PassThrough()

    const { keys } = options

    return staticModule({
    'dogstack/config': function () {
      const browserConfig = keys.reduce((sofar, key) => {
        sofar[key] = config[key]
        return sofar
      }, {})
      return stringToStream(
        'function () { return ' +
          JSON.stringify(browserConfig) +
        ' }'
      )
    }
  })
}
