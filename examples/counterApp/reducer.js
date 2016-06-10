var { combineReducers } = require('redux')
var { routerReducer } = require('react-router-redux')

var counterReducer = require('./counter/reducer')

module.exports = combineReducers({
  counter: counterReducer,
  routing: routerReducer
})
