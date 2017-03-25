const _ = require('lodash')

module.exports = function (questions, answers) {
  return _.map(answers, (value, questionId) => {
    return {questionId, value, category: questions[questionId].category}
  })
}
