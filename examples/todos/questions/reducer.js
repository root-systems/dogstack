const { handleActions } = require('redux-actions')
const _ = require('lodash')

const initialState = require('./state')
const { setAll } = require('./actions')

module.exports = handleActions({
  [setAll]: function (state, action) {
    return _.keyBy(action.payload, 'id')
  }
}, initialState)
