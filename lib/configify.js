const stringToStream = require('string-to-stream')
const staticModule = require('static-module')
const Config = require('feathers-configuration')

module.exports = Configify

function Configify (filename, options) {
  return staticModule({
    'feathers-configuration': function () {
      const getConfig = Config()
      const config = getConfig() || {}
      const browserConfig = config.browser || {}
      return stringToStream(
        'function () { return ' +
          JSON.stringify(browserConfig) +
        ' }'
      )
    }
  })
}
