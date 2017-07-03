require('rxjs') // require before redux-observable to ensure prototype methods added
const { createStore: Store, applyMiddleware, compose } = require('redux')
const { createEpicMiddleware, combineEpics } = require('redux-observable')
const { ConnectedRouter, routerMiddleware } = require('react-router-redux')
const { concat: concatUpdaters } = require('redux-fp')
const { createLogger } = require('redux-logger')

module.exports = createStore

function createStore (options) {
  const {
    state,
    updater,
    epic,
    middlewares = [],
    enhancers = [],
    history,
    client
  } = options

  const enhancer = compose(
    applyMiddleware(...[
      createEpicMiddleware(epic, { dependencies: { feathers: client } }),
      routerMiddleware(history),
      ...middlewares,
      createLogger()
    ]),
    ...enhancers
  )

  const reducer = updaterToReducer(updater)
  const store = Store(reducer, state, enhancer)

  return store
}

function updaterToReducer (updater) {
  return (state, action) => updater(action)(state)
}
