const React = require('react')
const { connect } = require('react-redux')
const Assessment = require('../components/assessment')
const { find: findQuestions } = require('../../questions/actions')
const { recordQuestionAnswers } = require('../../answers/actions')
const {increment: incrementCurrentQuestion} = require('../actions')
const { assesssmentResults } = require('../actions')

class AssessmentContainer extends React.Component {
  componentDidMount () {
    this.props.findQuestions()
  }
  render () {
    const {
      answers,
      assessment,
      assesssmentResults,
      incrementCurrentQuestion,
      questions,
      recordQuestionAnswers
      } = this.props
    return (
      <div>
        <Assessment
          answers={answers}
          assessment={assessment}
          assesssmentResults={assesssmentResults} incrementCurrentQuestion={incrementCurrentQuestion}
          questions={questions}
          recordQuestionAnswers={recordQuestionAnswers}
           />
      </div>
    )
  }
}

module.exports = connect(
  (state) => state,
  {
    findQuestions,
    recordQuestionAnswers,
    incrementCurrentQuestion,
    assesssmentResults
  }
)(AssessmentContainer)
