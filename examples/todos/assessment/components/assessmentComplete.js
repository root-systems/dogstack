const React = require('react')
const tally = require('../../assessment/getters/findTotals.js')

class AssessmentCompletion extends React.Component {
  componentDidMount () {
    const result = tally(this.props.answers)
    this.props.assesssmentResults(result)
  }
  render () {
    const { processedAnswers } = this.props
    return (
      <div className='assessmentCompletion'>
        <h1>Congratulations You're Done!</h1>
        <div className='assessmentCompletionGraphic'>
          <div className='assessmentCompletionText'>
            <h2>
              You are clearly very awesome!
            </h2>
            <h3>Your A score is {processedAnswers.a}</h3>
            <h3>Your B score is {processedAnswers.b}</h3>
            <h3>Your C score is {processedAnswers.c}</h3>
            <h3>Your D score is {processedAnswers.d}</h3>
            <h3>Your E score is {processedAnswers.e}</h3>
            <h3>Your F score is {processedAnswers.f}</h3>
          </div>
        </div>
        <button> Download My Assessment</button>
      </div>
    )
  }
}

module.exports = AssessmentCompletion
