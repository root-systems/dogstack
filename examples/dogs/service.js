const feathers = require('feathers')
const bodyParser = require('body-parser')
const rest = require('feathers-rest')
const hooks = require('feathers-hooks')
const forEach = require('lodash/forEach')

const configuration = require('feathers-configuration')
const authentication = require('feathers-authentication')
const local = require('feathers-authentication-local')
const jwt = require('feathers-authentication-jwt')

const services = {
  dogs: require('./dogs/service'),
  accounts: require('./account/service'),
}

module.exports = function (db) {
  return function () {
    const app = this

    app.configure(configuration())
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.configure(rest('/api'))
    app.configure(hooks())
    // services
    forEach(services, (service, name) => {
      const serviceRoute = name
      app.use(serviceRoute, service(db))
      app.service(serviceRoute).after(
        service.after || {}
      )
      app.service(serviceRoute).before(
        service.before || {}
      )
    })

    app.configure(authentication(app.get('auth')))
      .configure(jwt())
      .configure(local())
      .configure(require('./authentication/service'))
  }
}
