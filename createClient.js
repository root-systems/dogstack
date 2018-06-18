const feathers = require('feathers/client')
const socketio = require('feathers-socketio/client')
const hooks = require('feathers-hooks')
const rx = require('feathers-reactive')
const Rx = require('rxjs')
const io = require('socket.io-client')

module.exports = createClient

function createClient (options) {
  const {
    services = [],
    config
  } = options

  const apiUrl = config.api.url
  const socket = io(apiUrl)

  const client = feathers()
    .configure(socketio(socket))
    .configure(hooks())
    .configure(rx(Rx))

  services.map(service => {
    client.configure(service)
  })

  return client
}
