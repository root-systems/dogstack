const feathers = require('feathers')
const bodyParser = require('body-parser')
const rest = require('feathers-rest')
const hooks = require('feathers-hooks')
const forEach = require('lodash/forEach')

const authentication = require('./authentication/service')

const services = {
  dogs: require('./dogs/service'),
  accounts: require('./account/service')
}


module.exports = function (db) {
  return function () {
    const app = this

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.configure(rest())
    app.configure(hooks())
    app.configure(authentication)
    // services
    forEach(services, (service, name) => {
      const serviceRoute = '/api/' + name
      app.use(serviceRoute, service(db))
      app.service(serviceRoute).after(
        service.after || {}
      )
      app.service(serviceRoute).before(
        service.before || {}
      )
    })
  }
}
