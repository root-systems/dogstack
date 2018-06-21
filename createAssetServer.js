const fs = require('fs')
const url = require('url')
const assert = require('assert')
const { join, basename } = require('path')
const merge = require('ramda/src/merge')
const feathers = require('@feathersjs/feathers')
const configuration = require('@feathersjs/configuration')
const express = require('@feathersjs/express')
const httpLogger = require('pino-http')
const compress = require('compression')
const helmet = require('helmet')
const favicon = require('serve-favicon')
const forceSsl = require('express-enforces-ssl')
const propOr = require('ramda/src/propOr')
const Bundler = require('bankai/http')

const createLog = require('./createLog')
const normalizePort = require('./lib/normalizePort')
const startServer = require('./lib/startServer')

const getEntryFile = propOr('browser.js', 'entry')

module.exports = createServer

function createServer (options) {
  const {
    cwd = process.cwd()
  } = options

  const app = feathers()
  // load config from ./config
  app.configure(configuration())

  const logConfig = app.get('log')
  const log = createLog({ name: basename(cwd), level: logConfig.level })

  app.set('log', log)

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
    app.use('/', express.static(assetConfig.root, assetConfig))
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
