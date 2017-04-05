'use strict'

const authentication = require('feathers-authentication')

//TODO:remove this into config
const authConfig = {
    idField: "id",
    token: {
      secret: "FEATHERS_AUTH_SECRET"
    },
    local: {}
}

module.exports = function () {
  const app = this

  const config = Object.assign({userEndpoint: '/api/accounts', tokenEndpoint: '/api/auth/token', localEndpoint: '/api/auth/local'}, authConfig)

  app.configure(authentication(config).bind(this))
}
