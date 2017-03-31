const feathers = require('feathers')
const bodyParser = require('body-parser')
const rest = require('feathers-rest')
const hooks = require('feathers-hooks')
const forEach = require('lodash/forEach')
const keyBy = require('lodash/keyBy')

const services = {
  dogs: require('./dogs/service.js')
}

module.exports = function (db) {
  return function () {
    const app = this
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: false }))
    app.configure(rest())
    app.configure(hooks())
    // services
    forEach(services, (service, name) => {
      const serviceRoute = '/api/' + name
      app.use(serviceRoute, service(db))
      app.service(serviceRoute).after({
        all (hook) {
          if (hook.method === 'find') {
            hook.result = keyBy(hook.result, 'id')
          } else {
            hook.result = { [hook.result.id]: hook.result }
          }
        }
      })
    })
  }
}
