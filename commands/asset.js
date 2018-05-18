const { basename } = require('path')
const { assign } = Object

module.exports = {
  command: 'asset',
  description: 'start asset server',
  handler: argv => {
    if (process.env.NODE_ENV === 'development') {
      require('longjohn')
    }

    const createLog = require('../createLog')
    const createAssetServer = require('../createAssetServer')

    const { cwd } = argv
    const name = basename(cwd)

    const log = createLog({ name })

    const server = createAssetServer({ log })
    const close = server()
  }
}
