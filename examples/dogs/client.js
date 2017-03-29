const feathers = require('feathers/client')
const rest = require('feathers-rest/client')

const client = feathers()
  .configure(rest('/api').fetch(window.fetch.bind(window)))

module.exports = client

window.client = client
