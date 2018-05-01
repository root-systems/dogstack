const fs = require('fs')
const assert = require('assert')
const { join } = require('path')
const merge = require('ramda/src/merge')
const feathers = require('feathers')
const configuration = require('feathers-configuration')
const httpLogger = require('pino-http')
const compress = require('compression')
const helmet = require('helmet')
const favicon = require('serve-favicon')
const forceSsl = require('express-enforces-ssl')
const Bundler = require('bankai/http')

const normalizePort = require('./lib/normalizePort')
const startServer = require('./lib/startServer')

module.exports = createServer

function createServer (options) {
  const {
    cwd = process.cwd(),
    log
  } = options

  const app = feathers()

  app.set('log', log)

  // load config from ./config
  app.configure(configuration())

  // log requests and responses
  app.use(httpLogger({ logger: log }))

  // gzip compression
  app.use(compress())

  // http security headers
  app.use(helmet())

  // favicon
  const faviconConfig = app.get('favicon')
  assert(faviconConfig, 'must set `favicon` in config. example: "app/favicon.ico"')
  app.use(favicon(faviconConfig))

  // static files
  const assetsConfig = app.get('assets')
  assert(assetsConfig, 'must set `assets` in config. example: "assets"')
  if (assetsConfig.root) {
    app.use('/', feathers.static(assetsConfig.root, assetsConfig))
  }

  // javascript bundler
  const entryPath = join(__dirname, 'entry.js')
  const bundlerHandler = Bundler(entryPath, {
    plugins: [
      // expose entry as 'dogstack'
      (bundler) => {
        bundler.require(__dirname, { expose: 'dogstack' })
      }
    ]
  })
  const compiler = bundlerHandler.compiler
  app.use(bundlerHandler)
  compiler.on('error', (nodeName, edgeName, err) => {
    log.fatal(err)
  })

  return (cb) => {
    return startServer(app, cb)
  }
}
