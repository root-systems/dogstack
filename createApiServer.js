const fs = require('fs')
const url = require('url')
const assert = require('assert')
const { join } = require('path')
const merge = require('ramda/src/merge')
const forEachObjIndexed = require('ramda/src/forEachObjIndexed')
const feathers = require('feathers')
const httpLogger = require('pino-http')
const compress = require('compression')
const helmet = require('helmet')
const favicon = require('serve-favicon')
const errorHandler = require('feathers-errors/handler')
const configuration = require('feathers-configuration')
const hooks = require('feathers-hooks')
const rest = require('feathers-rest')
const socketio = require('feathers-socketio')
const forceSsl = require('express-enforces-ssl')

const normalizePort = require('./lib/normalizePort')
const startServer = require('./lib/startServer')

module.exports = createServer

function createServer (options) {
  const {
    cwd = process.cwd(),
    log,
    db,
    services = []
  } = options
  console.log('services', services)

  const app = feathers()

  app.set('log', log)
  app.set('db', db)

  // load config from ./config
  app.configure(configuration())

  const apiConfig = app.get('api')
  const apiUrl = url.parse(apiConfig.url)
  app.set('port', apiConfig.port)
  app.set('host', apiUrl.hostname)

  // log requests and responses
  app.use(httpLogger({ logger: log }))

  if (app.get('env') === 'production') {
     app.enable('trust proxy')
     app.use(forceSsl())
  }

  // gzip compression
  app.use(compress())

  // http security headers
  app.use(helmet())

  // feathers hooks
  app.configure(hooks())

  // transports
  app.configure(rest())
  app.configure(socketio({
    wsEngine: 'uws'
  }))

  // services (plugins)
  services.forEach(service => {
    app.configure(service)
  })

  // log errors
  app.use(function (err, req, res, next) {
    if (err) console.error('error', err)
    next(err)
  })

  // error handler
  app.use(errorHandler())

  return (cb) => {
    return startServer(app, cb)
  }
}
