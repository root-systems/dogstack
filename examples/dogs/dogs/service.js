const feathersKnex = require('feathers-knex')
const keyBy = require('lodash/keyBy')

module.exports = function (db) {
  return feathersKnex({
    Model: db,
    name: 'dogs'
  })
}

module.exports.after = {
  find: (hook)  => {
    hook.result = keyBy(hook.result, 'id')
  }
}
