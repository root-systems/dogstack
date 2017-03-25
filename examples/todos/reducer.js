const { combineReducers } = require('redux')
import { reducer as formReducer } from 'redux-form'

module.exports = combineReducers({
  assessment: require('./assessment/reducer.js'),
  answers: require('./answers/reducer.js'),
  questions: require('./questions/reducer.js'),
  form: formReducer
})
