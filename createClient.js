const feathers = require('feathers/client')
const socketio = require('feathers-socketio/client')
const hooks = require('feathers-hooks')
const auth = require('feathers-authentication-client')
const rx = require('feathers-reactive')
const Rx = require('rxjs')
const io = require('socket.io-client')

module.exports = createClient

function createClient (options) {
  const {
    services = []
  } = options

  const localStorage = window ? window.localStorage : null

  const socket = io()

  const client = feathers()
    .configure(socketio(socket))
    .configure(hooks())
    .configure(rx(Rx))
    .configure(auth({
      storage: localStorage,
      accessTokenKey: 'dogstack'
    }))

  services.map(service => {
    client.configure(service)
  })

  return client
}
