var React = require('react')
var { render } = require('react-dom')
var { createStore, compose, applyMiddleware } = require('redux')
var { Provider } = require('react-redux')
var { Router, browserHistory } = require('react-router')
var { routerMiddleware, syncHistoryWithStore } = require('react-router-redux')

module.exports = function(mount, reducer, route) {

  //store from reducer, with history
  var createEnhancedStore = compose(
    applyMiddleware(routerMiddleware(browserHistory))
  )(createStore)
  var store = createEnhancedStore(reducer)

  //routing
  var routes = (
    <Router history={syncHistoryWithStore(browserHistory, store)}>
      { route() }
    </Router>
  )

  //rendering
  render(
    <Provider store={store}>
      { routes }
    </Provider>,
    mount
  )

}
