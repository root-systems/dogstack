const Knex = require('knex')

module.exports = Db

function Db (config) {
  const env = process.env.NODE_ENV || 'development'
  return Knex(config[env])
}
