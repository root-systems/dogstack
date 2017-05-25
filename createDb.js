const Knex = require('knex')

module.exports = createDb

function createDb (config) {
  const env = process.env.NODE_ENV || 'development'
  return Knex(config[env])
}
