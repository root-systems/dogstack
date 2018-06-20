const { basename } = require('path')
const { assign } = Object

module.exports = {
  command: 'asset',
  description: 'start asset server',
  handler: argv => {
    if (process.env.NODE_ENV === 'development') {
      require('longjohn')
    }

    const createAssetServer = require('../createAssetServer')
    const server = createAssetServer({})
    const close = server()
  }
}
