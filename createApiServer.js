const fs = require('fs')
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

  const app = feathers()

  app.set('log', log)
  app.set('db', db)

  // load config from ./config
  app.configure(configuration())

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

function startServer (app, cb) {
  const port = app.get('port')
  const log = app.get('log')

  const server = app.listen(port, cb)

  server.on('error', onError)
  server.on('listening', onListening)

  return (cb) => {
    server.close(cb)
  }

  function onError (error) {
    if (error.syscall !== 'listen') {
      throw error
    }

    const bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        log.fatal(bind + ' requires elevated privileges')
        return process.exit(1)
      case 'EADDRINUSE':
        log.fatal(bind + ' is already in use')
        return process.exit(1)
      default:
        throw error
    }
  }

  function onListening () {
    const addr = server.address()
    const bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port
    log.info('Listening on ' + bind)
  }
}

function normalizePort (val) {
  const port = parseInt(val, 10)

  if (isNaN(port)) {
    // named pipe
    return val
  }

  if (port >= 0) {
    // port number
    return port
  }

  return false
}
