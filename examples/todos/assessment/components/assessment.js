const React = require('react')
const _ = require('lodash')
const AssessmentForm = require('./assessmentForm')
const AssessmentComplete = require('./assessmentComplete')

function Assessment (props) {
  const {
    answers,
    assessment,
    assesssmentResults,
    incrementCurrentQuestion,
    questions,
    recordQuestionAnswers
   } = props
  const { currentQuestion } = assessment
  console.log(assessment)
  return currentQuestion === 0 || currentQuestion < Object.keys(questions).length
  ? <AssessmentForm
    currentQuestion={currentQuestion}
    incrementCurrentQuestion={incrementCurrentQuestion}
    questions={questions}
    recordQuestionAnswers={recordQuestionAnswers}
    />
  : <AssessmentComplete
    answers={answers}
    assesssmentResults={assesssmentResults}
    processedAnswers={assessment.processedAnswers}
  />
}

module.exports = Assessment
