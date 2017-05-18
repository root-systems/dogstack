const assert = require('assert')
const { join } = require('path')
const is = require('ramda/src/is')
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
const socketio = require('feathers-socketio')
const authentication = require('feathers-authentication')
const UifyServer = require('uify-server')
const pump = require('pump')

const isString = is(String)

module.exports = Server

function Server (options) {
  const {
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
  app.use('/', feathers.static(assetsConfig))

  // javascript bundler
  const bundlerConfig = app.get('bundler')
  const defaultBundlerConfig = {
    entry: join(process.cwd(), 'browser.js'),
    debug: app.get('env') === 'development',
    optimize: false, // (mw) for some reason this breaks in production
    cache: app.get('env') === 'production',
    log
  }
  app.use(Bundler(merge(defaultBundlerConfig, bundlerConfig)))

  // feathers hooks
  app.configure(hooks())

  // transports
  app.configure(socketio({
    wsEngine: 'uws'
  }))

  // authentication
  const authConfig = app.get('auth')
  assert(authConfig, 'must set `auth` in config.')
  app.configure(authentication(authConfig))

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

// wrap uify-server to be compatible with
// express middleware and next(err)
//
// TODO maybe this should be `express-uify`?
// or maybe `uify-server` shouldn't expect `http-sender`
function Bundler (options) {
  const uifyServer = UifyServer(options)

  return (req, res, next) => {
    uifyServer(req, res, {}, finalHandler)

    function finalHandler (err, value) {
      if (err) next(err)
      else valueHandler(req, res, next, value)
    }
  }

  function valueHandler (req, res, next, value) {
    if (isString(value) || Buffer.isBuffer(value)) {
      res.send(value)
    } else {
      // is stream
      pump(value, res, err => {
        if (err) next(err)
      })
    }
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
