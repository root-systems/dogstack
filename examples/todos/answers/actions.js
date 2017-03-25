const { createAction } = require('redux-actions')

const recordQuestionAnswers = createAction('ANSWERS_RECORD_QUESTION_ANSWERS')

module.exports = {
  recordQuestionAnswers
}
