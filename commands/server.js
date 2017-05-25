const { join, basename } = require('path')
const { assign } = Object

// reference:
// https://github.com/avajs/ava/blob/master/lib/cli.js

module.exports = {
  command: 'server [file]',
  description: 'start feathers http server',
  handler: argv => {
    if (process.env.NODE_ENV === 'development') {
      require('longjohn')
    }

    const createLog = require('../createLog')
    const createDb = require('../createDb')
    const createServer = require('../createServer')

    const {
      cwd,
      file = './services.js'
    } = argv
    const name = basename(cwd)
    const dbConfigPath = join(cwd, 'db/index.js')
    const appPath = join(cwd, file)

    const dbConfig = require(dbConfigPath)
    const db = createDb(dbConfig)

    const log = createLog({ name })

    const services = require(appPath)
    const server = createServer({ db, log, services })
    const close = server()
  }
}
