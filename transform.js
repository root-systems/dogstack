const configify = require('./lib/configify')
module.exports = function transform (filename, options) {
  const { config, _flags } = options
  return configify(filename, Object.assign({ _flags }, config))
}
