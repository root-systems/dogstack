const { handleActions } = require('redux-actions')
const _ = require('lodash')
const { recordQuestionAnswers } = require('./actions')

const initialState = require('./state')

module.exports = handleActions({
  [recordQuestionAnswers]: function (state, action) {
    return Object.assign({}, state, action.payload)
  }
}, initialState)
