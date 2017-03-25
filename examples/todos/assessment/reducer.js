const { handleActions } = require('redux-actions')
const _ = require('lodash')

const initialState = require('./state')
const { assesssmentResults, increment, setCurrentUser } = require('./actions')

module.exports = handleActions({
  [increment]: function (state, action) {
    return _.assign({}, state, {
      currentQuestion: state.currentQuestion + action.payload
    })
  },
  [setCurrentUser]: function (state, action) {
    return Object.assign({}, state, {
      currentUser: Object.assign({}, state.currentUser, action.payload
      )
    })
  },
  [assesssmentResults]: function (state, action) {
    return Object.assign({}, state, {
      processedAnswers: Object.assign({}, state.processedAnswers, action.payload
      )
    })
  }

}, initialState)
