const feathers = require('@feathersjs/feathers')
const socketio = require('@feathersjs/socketio-client')
const reactive = require('feathers-reactive')
const io = require('socket.io-client')

module.exports = createClient

function createClient (options) {
  const {
    services = [],
    config
  } = options

  const socket = io(config.api.url)

  const client = feathers()
    .configure(socketio(socket))
    .configure(hooks())
    .configure(reactive({ idField: 'id' }))

  services.map(service => {
    client.configure(service)
  })

  return client
}
