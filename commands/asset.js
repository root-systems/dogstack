const { basename } = require('path')
const { assign } = Object

// reference:
// https://github.com/avajs/ava/blob/master/lib/cli.js

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
