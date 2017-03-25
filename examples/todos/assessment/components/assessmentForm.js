const React = require('react')
const _ = require('lodash')
const currentQuestions = require('../getters/currentQuestions')
const { Field, reduxForm } = require('redux-form')
const processAnswers = require('../getters/processAnswers')

class AssessmentForm extends React.Component {
  nextClicked (answers) {
    const {
      questions,
      incrementCurrentQuestion,
      recordQuestionAnswers
    } = this.props

    const processedAnswers = processAnswers(questions, answers)
    recordQuestionAnswers(processedAnswers)
    incrementCurrentQuestion(3)
  }

  render (values) {
    const { questions, currentQuestion } = this.props
    return (
      <div>
        <div className='assessmentQuestions'>
          <form onSubmit={this.props.handleSubmit(this.nextClicked.bind(this))}>
            {
              _.map(currentQuestions(questions, currentQuestion), (question) => (
                <div className='eachAssessmentQuestion' key={question.id}>
                  {question.text}
                  <div className='assessmentQuestionInputs'>
                    <Field name={question.id.toString()} component='input' type='radio' value='1' />
                    <Field name={question.id.toString()} component='input' type='radio' value='2' />
                    <Field name={question.id.toString()} component='input' type='radio' value='3' />
                    <Field name={question.id.toString()} component='input' type='radio' value='4' />
                    <Field name={question.id.toString()} component='input' type='radio' value='5' />
                    <Field name={question.id.toString()} component='input' type='radio' value='6' />
                    <Field name={question.id.toString()} component='input' type='radio' value='7' />
                  </div>
                </div>
              )
            )}
            <button type='submit'>Next</button>
          </form>
        </div>
      </div>
    )
  }
}

AssessmentForm = reduxForm({
  form: 'questions',
  initialValues: {
    1: '2',
    2: '4',
    3: '3',
    4: '2',
    5: '4',
    6: '3',
    7: '2',
    8: '4',
    9: '3'
  }
})(AssessmentForm)

module.exports = AssessmentForm
