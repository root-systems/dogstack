const feathersKnex = require('feathers-knex')

module.exports = function (db) {
  return feathersKnex({
    Model: db,
    name: 'questions'
  })
}
