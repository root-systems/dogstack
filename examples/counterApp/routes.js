var React = require('react')
var { Route } = require('react-router')

var CounterRoutes = require('./counter/routes')

module.exports = function() {
  return <Route path='/'>
    { CounterRoutes() }
  </Route>
}
