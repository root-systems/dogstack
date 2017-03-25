const React = require('react')

function howItWorks (props) {
  return (
    <div className='howItWorks'>
      <h1>How it works?</h1>
      <h2>Find out more about you</h2>
      <div className='howItWorksGraphic'>
        <div className='howItWorksText'>
          <h2>
            Rate the following statements to discover what makes you awesome
          </h2>
          <p>
            Be honest! You'll get the best result, there's no right or wrong answer
          </p>
        </div>
      </div>
      <button onClick={() => props.router.push(`/assessment`)}>Next</button>
    </div>
  )
}

module.exports = howItWorks
