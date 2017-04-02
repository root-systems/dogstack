import feathers from 'feathers/client'
import rest from 'feathers-rest/client'

const client = feathers()
  .configure(rest('/api').fetch(window.fetch.bind(window)))

module.exports = client
