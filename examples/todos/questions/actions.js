const { createAction } = require('redux-actions')
const client = require('../client')

const questions = client.service('questions')

const setAll = createAction('SET_ALL')
/*
const setAll = (payload) => ({
  type: 'SET_ALL',
  payload
})
*/

function find () {
  return function (dispatch, getState) {
    questions.find().then((value) => {
      dispatch(setAll(value))
    })
  }
}

module.exports = {
  find,
  setAll
}
