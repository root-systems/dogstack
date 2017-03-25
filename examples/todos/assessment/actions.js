const { createAction } = require('redux-actions')

const increment = createAction('ASSESSMENT_INCREMENT')
const setCurrentUser = createAction('ASSESSMENT_SET_ACTIVE_USER')
const assesssmentResults = createAction('STORE_ASSESSMENT_RESULTS')

module.exports = {
  increment,
  setCurrentUser,
  assesssmentResults
}
