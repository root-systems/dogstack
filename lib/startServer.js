module.exports = startServer

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
