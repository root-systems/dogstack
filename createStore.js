require('rxjs') // require before redux-observable to ensure prototype methods added
const { createStore: Store, applyMiddleware } = require('redux')
const { createEpicMiddleware, combineEpics } = require('redux-observable')
const { routerReducer, routerMiddleware } = require('react-router-redux')
const { reducer: formReducer } = require('redux-form')
const { concat: concatUpdaters, updateStateAt } = require('redux-fp')
const { createLogger } = require('redux-logger')
const { composeWithDevTools } = require('redux-devtools-extension')

module.exports = createStore

function createStore (options) {
  const {
    state,
    updater: appUpdater,
    epic,
    middlewares = [],
    enhancers = [],
    history,
    client
  } = options

  const enhancer = composeWithDevTools(
    applyMiddleware(...[
      createEpicMiddleware(epic, { dependencies: { feathers: client } }),
      routerMiddleware(history),
      ...middlewares,
      createLogger()
    ]),
    ...enhancers
  )

  const routerUpdater = updateStateAt('router', reducerToUpdater(routerReducer))
  const formUpdater = updateStateAt('form', reducerToUpdater(formReducer))

  const updater = concatUpdaters(
    appUpdater,
    routerUpdater,
    formUpdater
  )
  const reducer = updaterToReducer(updater)
  const store = Store(reducer, state, enhancer)

  return store
}

function reducerToUpdater (reducer) {
  return action => state => reducer(state, action)
}

function updaterToReducer (updater) {
  return (state, action) => updater(action)(state)
}
