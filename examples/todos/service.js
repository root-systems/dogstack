const feathers = require('feathers')
const bodyParser = require('body-parser')
const rest = require('feathers-rest')
const _ = require('lodash')

const services = {
  questions: require('./questions/service.js')
}

module.exports = function (db) {
  return function () {
    const app = this
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: false }))
    app.configure(rest())
    // services
    _.forEach(services, (service, name) => {
      app.use('/api/' + name, service(db))
    })
  }
}
