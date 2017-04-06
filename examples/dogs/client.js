import feathers from 'feathers/client'
import rest from 'feathers-rest/client'
import hooks from 'feathers-hooks'
import auth from 'feathers-authentication/client'

const localStorage = window ? window.localStorage : null

const client = feathers()
  .configure(rest('/api').fetch(window.fetch.bind(window)))
  .configure(hooks())
  .configure(auth({
    storage: localStorage,
    tokenKey: '41S'
  }))

export default client
