const _ = require('lodash')

module.exports = function currentQuestions (assessmentQuestions, currentQuestion) {
  return _.filter(assessmentQuestions, function (question) {
    return (question.id > currentQuestion && question.id <= currentQuestion + 3)
  })
}
