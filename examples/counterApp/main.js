var stack = require('../../index')

var rootReducer = require('./reducer')
var rootRoute = require('./routes')

stack(document.querySelector('main'), rootReducer, rootRoute)
