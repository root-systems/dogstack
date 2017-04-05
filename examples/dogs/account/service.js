const feathersKnex = require('feathers-knex')
const hooks = require('feathers-hooks')
const auth = require('feathers-authentication').hooks

module.exports = function (db) {
  return feathersKnex({
    Model: db,
    name: 'accounts'
  })
}

