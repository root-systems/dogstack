const { join, basename } = require('path')
const { assign } = Object

// reference:
// https://github.com/avajs/ava/blob/master/lib/cli.js

module.exports = {
  command: 'api',
  description: 'start api server',
  handler: argv => {
    if (process.env.NODE_ENV === 'development') {
      require('longjohn')
    }

    const createLog = require('../createLog')
    const createDb = require('../createDb')
    const createApiServer = require('../createApiServer')

    const { cwd } = argv
    const name = basename(cwd)
    const dbConfigPath = join(cwd, 'db/index.js')
    const appPath = join(cwd, 'server.js')

    require('babel-register')
    const dbConfig = require(dbConfigPath)
    const db = createDb(dbConfig)

    const log = createLog({ name })

    const serverOptions = getDefaultExport(require(appPath))
    const server = createServer(assign({ db, log }, serverOptions))
    const close = server()
  }
}

// interop when using babel
function getDefaultExport (obj) { return obj && obj.__esModule ? obj.default : obj }
