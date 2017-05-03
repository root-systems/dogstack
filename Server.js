module.exports = Server

function Server ({ app, log }) {
  /**
   * Get port from environment and store in Express.
   */

  const port = normalizePort(process.env.PORT || '3000')
  app.set('port', port)

  return (cb) => {
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
