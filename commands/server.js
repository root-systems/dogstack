const { join, basename } = require('path')
const { assign } = Object

// reference:
// https://github.com/avajs/ava/blob/master/lib/cli.js

module.exports = {
  command: 'server',
  description: 'start feathers http server',
  handler: argv => {
    if (process.env.NODE_ENV === 'development') {
      require('longjohn')
    }

    const createLog = require('../createLog')
    const createDb = require('../createDb')
    const createServer = require('../createServer')

    const { cwd } = argv
    const name = basename(cwd)
    const dbConfigPath = join(cwd, 'db/index.js')
    const appPath = join(cwd, 'server.js')

    require('babel-register')
    const dbConfig = require(dbConfigPath)
    const db = createDb(dbConfig)

    const log = createLog({ name })

    const serverOptions = require(appPath)
    const server = createServer(assign({ db, log }, serverOptions))
    const close = server()
  }
}
