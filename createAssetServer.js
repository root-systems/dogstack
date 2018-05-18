const fs = require('fs')
const url = require('url')
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
const propOr = require('ramda/src/propOr')
const Bundler = require('bankai/http')

const normalizePort = require('./lib/normalizePort')
const startServer = require('./lib/startServer')

const getEntryFile = propOr('browser.js', 'entry')

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

  const assetConfig = app.get('asset')
  assert(assetConfig, 'must set `asset` in config. example: "asset"')
  const assetUrl = url.parse(assetConfig.url)
  app.set('port', assetConfig.port)
  app.set('host', assetUrl.hostname)

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
  if (assetConfig.root) {
    app.use('/', feathers.static(assetConfig.root, assetConfig))
  }

  // javascript bundler
  const entryFile = getEntryFile(assetConfig)
  const entryPath = join(cwd, entryFile)
  const bundlerHandler = Bundler(entryPath, {
    dirname: cwd
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
