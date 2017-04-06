'use strict'

const auth = require('feathers-authentication')

// Authenticate the user using the a JWT or
// email/password strategy and if successful
// return a new JWT access token.

module.exports = function () {
  return function() {
    const app = this
    app.service('authentication').hooks({
      before: {
        create: [
          auth.hooks.authenticate(['jwt', 'local'])
        ]
      }
    })
  }
}
