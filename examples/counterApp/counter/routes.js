var React = require('react')
var { IndexRoute } = require('react-router')

var CounterContainer = require('./containers/counter')

module.exports = function() {
  return <IndexRoute component={CounterContainer} />
}
